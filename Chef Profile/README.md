# Chef Profile

Static website built with webpack.

## Run locally

```bash
npm install
npm start
```

## Build for production

```bash
npm run build
```

Build output is generated in `dist/`.

## Publish on GitHub Pages

This repository includes a workflow at `.github/workflows/pages.yml` that deploys `dist/` to GitHub Pages whenever you push to `main`.

1. Push this project to a GitHub repository.
2. In GitHub, open **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from **Actions**).
5. GitHub will provide your live URL in the deployment details.

