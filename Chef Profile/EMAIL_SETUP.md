# Contact Form Email Setup

The contact form emails enquiries to the chef. Two modes:

1. EmailJS (recommended): fully automated, sent in the background.
2. Fallback (no setup): the visitor's email app opens pre-filled.

Either way the customer is told to allow up to 3 business days for a reply.

## Enable EmailJS (free)

1. Sign up at https://www.emailjs.com/
2. Email Services -> Add New Service; connect the receiving inbox; copy the Service ID.
3. Email Templates -> Create New Template using variables from_name, from_email, subject, message; set Reply-To to reply_to; copy the Template ID.
4. Account -> General -> copy the Public Key.
5. In js/app.js, fill EMAILJS_CONFIG with publicKey, serviceId, templateId.
6. Run: npm run build, then commit and push.

## Notes

- The EmailJS Public Key is safe in client-side code by design.
- Until keys are added, the mailto fallback is used automatically.
- The fallback recipient is set by CONTACT_EMAIL in js/app.js.
