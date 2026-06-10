/* Chef Profile – app.js */

/* ---- Footer year ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Mobile nav toggle ---- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 68; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Sticky header shadow on scroll ---- */
const header = document.querySelector('.site-header');
if (header) {
  const updateHeader = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.45)'
      : '0 2px 12px rgba(0,0,0,0.3)';
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* ---- Contact form ---- */
/*
 * Sends the enquiry by email. Two methods are supported:
 *
 * 1. EmailJS (recommended – fully automated, no backend needed).
 *    - Create a free account at https://www.emailjs.com/
 *    - Add an email service and an email template.
 *    - Paste your three IDs below. Your template should reference the
 *      variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}.
 *
 * 2. Fallback: if EmailJS is not configured, the visitor's email client
 *    opens with the message pre-filled (mailto:).
 */
const EMAILJS_CONFIG = {
  publicKey: 'FT9F3B40004-bJstw',     // EmailJS Public Key
  serviceId: 'service_g0c6j2g',     // EmailJS Service ID
  templateId: 'template_pwpe055',   // EmailJS Template ID
};

// Where enquiries are sent when using the mailto fallback.
const CONTACT_EMAIL = 'cbiscocho85@gmail.com';

// Shown to the customer after a successful submission.
const RESPONSE_MESSAGE =
  '✓ Thank you! Your message has been sent. Please allow up to 3 business days for a response.';

const isEmailJsConfigured = () =>
  typeof window.emailjs !== 'undefined' &&
  EMAILJS_CONFIG.publicKey &&
  !EMAILJS_CONFIG.publicKey.startsWith('YOUR_') &&
  !EMAILJS_CONFIG.serviceId.startsWith('YOUR_') &&
  !EMAILJS_CONFIG.templateId.startsWith('YOUR_');

// Initialise EmailJS if it is configured and loaded.
if (isEmailJsConfigured()) {
  window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form && formStatus) {
  const setStatus = (text, ok = true) => {
    formStatus.style.color = ok ? '#4caf50' : '#e05252';
    formStatus.textContent = text;
  };

  // Opens the visitor's mail client with the enquiry pre-filled.
  const sendViaMailto = ({ name, email, subject, message }) => {
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      subject ? `Subject: ${subject}` : null,
      '',
      message,
    ].filter(Boolean);
    const mailtoSubject = encodeURIComponent(
      subject ? `Website enquiry: ${subject}` : 'Website enquiry'
    );
    const mailtoBody = encodeURIComponent(lines.join('\n'));
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject ? form.subject.value.trim() : '';
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all required fields.', false);
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setStatus('Please enter a valid email address.', false);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    setStatus('Sending your message…');

    // Include common variable name aliases so the EmailJS template works
    // regardless of which placeholder names were used in the dashboard.
    const payload = {
      // name aliases
      from_name: name,
      name: name,
      user_name: name,
      // email aliases (sender / reply-to)
      from_email: email,
      email: email,
      user_email: email,
      reply_to: email,
      // recipient aliases (in case the template references these)
      to_email: CONTACT_EMAIL,
      to_name: 'Christian Biscocho',
      // subject aliases
      subject: subject || 'General enquiry',
      title: subject || 'General enquiry',
      // message aliases
      message: message,
      message_html: message,
    };

    try {
      if (isEmailJsConfigured()) {
        await window.emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          payload
        );
        setStatus(RESPONSE_MESSAGE);
        form.reset();
        // Friendly confirmation prompt for the customer.
        window.alert(
          'Thank you for reaching out!\n\n' +
          'Your message has been sent successfully. ' +
          'Please allow up to 3 business days to receive a response.'
        );
      } else {
        // No EmailJS keys yet – fall back to the visitor's mail client.
        sendViaMailto({ name, email, subject, message });
        setStatus(
          'Your email app has opened — please press send. ' +
          'You can expect a response within 3 business days.'
        );
        window.alert(
          'Almost done!\n\n' +
          'Your email app should open with the message ready. ' +
          'Please press send to deliver it.\n\n' +
          'You can expect a response within 3 business days.'
        );
        form.reset();
      }
    } catch (err) {
      // Surface the real EmailJS error so issues are easy to diagnose.
      console.error('Email send failed:', err);
      const detail =
        (err && (err.text || err.message)) ||
        (typeof err === 'string' ? err : '') ||
        'Unknown error';
      setStatus(
        `Sorry, your message could not be sent (${detail}). ` +
        `Please email ${CONTACT_EMAIL} directly.`,
        false
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

/* ---- Scroll-reveal cards (Intersection Observer) ---- */
const revealElements = document.querySelectorAll('.dish-card, .about-grid, .contact-grid');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

