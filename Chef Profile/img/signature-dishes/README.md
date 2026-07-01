# Signature Dishes Folder

This folder automatically includes all images in the **Signature Dishes** gallery on the website.

## How to Use

1. **Add your images** to this folder (`img/signature-dishes/`)
2. **Supported formats**: jpg, jpeg, png, gif, webp
3. **Rebuild** the site using `npm run build` (for production) or `npm start` (for development)
4. **That's it!** Your images will automatically appear in the gallery

## Notes

- Images are displayed in alphabetical order by filename
- Alt text is automatically generated from the filename
- Images are lazy-loaded for better performance
- The gallery maintains the same styling as before

## Example

To add a dish image:
- Save your image as `pan_seared_salmon.jpg`
- Place it in the `img/signature-dishes/` folder
- Rebuild the site
- The image will automatically appear in the Signature Dishes section with alt text: "Chef Christian's signature dish - pan_seared_salmon"

No need to manually edit HTML anymore! 🍽️

