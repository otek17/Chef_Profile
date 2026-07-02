# Signature Dishes Image Guide

## What Changed

Your Chef Profile website currently uses a **static HTML gallery** for the Signature Dishes section, so images show reliably without depending on JavaScript.

### Files Modified:
1. **index.html** - Contains the gallery markup and image `<figure>` elements
2. **js/app.js** - Includes a fallback loader only if the gallery is empty
3. **webpack.config.prod.js** - Copies the signature-dishes folder during build

### New Folder Created:
- **img/signature-dishes/** - This is where you put your dish images

## How to Use

### 1. Add Images
Place your dish images in: `img/signature-dishes/`

**Supported formats:**
- jpg
- jpeg
- png
- gif
- webp

### 2. Add the Image to the Gallery

Open `index.html` and add a new `<figure class="gallery-item">` inside the `#gallery` container, for example:

```html
<figure class="gallery-item">
  <img src="img/signature-dishes/my_new_dish.jpg" alt="Chef Christian's signature dish - my_new_dish" loading="lazy" decoding="async">
</figure>
```

### 3. Refresh / Rebuild

For local development:
```bash
npm start
```

For production:
```bash
npm run build
```

### 4. Done!
Your new image will appear in the Signature Dishes gallery.

## Example

**Before:** You had to manually add this to `index.html`:
```html
<figure class="gallery-item">
  <img src="img/Seared_steak.jpg" alt="Seared steak...">
</figure>
```

**Now:** Save `Seared_steak.jpg` to `img/signature-dishes/` and add the matching `<figure>` block in the gallery.

## Features

✅ **Reliable** - Images are present directly in the HTML
✅ **Lazy Loading** - Images load as needed for better performance
✅ **Fallback Loader** - JavaScript can still populate the gallery if needed
✅ **Auto Alt Text** - Alt text is generated from filename
✅ **Responsive** - Gallery maintains existing CSS styling
✅ **Build Compatible** - Works with both dev and production builds

## Tips for Best Results

1. **Name your files descriptively:**
   - ✅ Good: `pan_seared_salmon.jpg`, `chocolate_mousse.png`
   - ❌ Bad: `IMG_123.jpg`, `photo.jpg`

2. **Image naming affects alt text:**
   - File: `pan_seared_salmon.jpg`
   - Alt text: `Chef Christian's signature dish - pan_seared_salmon`

3. **To replace an image:**
   - Overwrite the file in `img/signature-dishes/` using the same filename
   - If the filename changes, update the `src` in `index.html`

4. **To add a new image:**
   - Copy it into `img/signature-dishes/`
   - Add a new `<figure>` block in the gallery

## No Backend Required

Everything works **client-side** with webpack — no server-side code needed. Just:
1. Add or replace the image file
2. Update `index.html` if it’s a new image
3. Run `npm start` or `npm run build`
4. Deploy

---

**That's it! Your dish gallery is now easy to update and reliable.** 🍽️

