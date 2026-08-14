# Anandu & Shylba — Wedding Invitation Website

Static website ready for GitHub Pages, Azure Static Web Apps, Netlify, or Vercel.

## Add background music

Place your chosen MP3 file at:

    assets/music.mp3

The Music button in the top-right will then play/pause it. Browsers generally block autoplay, so the guest needs to tap the Music button once.

## Local preview

Open `index.html` directly in a browser, or run a simple local server:

    python -m http.server 8000

Then visit http://localhost:8000

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files/folders from this package.
3. Go to Settings → Pages.
4. Select Deploy from branch.
5. Select `main` and `/ (root)`.
6. Save and wait for the Pages URL.

## Customize

- Event/venue text: `index.html`
- Design: `styles.css`
- Countdown/music/gallery behavior: `script.js`
- Photos: `assets/`
