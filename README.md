# Sonali Lindsay — artist website

A responsive, build-free website using semantic HTML, CSS and vanilla JavaScript. No installation, CMS, admin panel, database or build process is required. Nothing has been deployed.

## Preview and host

Upload **all the files and the `assets` folder in this directory** to the public directory of any static host. Keep `index.html` at its root. The band placeholder is `band.html`; no rewrite rules are needed. Relative asset paths also support hosting in a subdirectory.

For a local preview, use a static HTTP server. If Python is installed, run `python3 -m http.server 4173` in this directory and open `http://localhost:4173`. Opening the HTML directly from disk can restrict external embeds. Serve the finished site over HTTPS.

## Booking form configuration

The default is intentionally **not connected to email**. It validates required fields, trims whitespace and prepares a downloadable text draft in browser memory. It does not send, persist or claim to deliver an enquiry.

Set `emailEndpoint` in `config.js` to an HTTPS service you control or a form provider endpoint. The endpoint must accept a JSON POST containing `name`, `email`, `phone`, `type`, `date`, `venue` and `message`, deliver it to your chosen recipient, and return a 2xx response only when accepted. The UI changes to “Send Enquiry” once configured. Error and timeout states keep the entered details intact.

The endpoint must provide server-side validation, rate limiting/abuse controls and an appropriate CORS policy when on another origin. Keep recipient settings and service credentials on the server, never in `config.js`. Test actual email delivery before opening bookings. The default draft mode makes no outgoing form request.

## Music and video

- The five supplied MP3s are bundled unchanged. Track 1 → 2 → 3 → 4 → 5 → Track 1 cycles on the audio `ended` event.
- Autoplay is attempted at 35% volume. If blocked, a first eligible tap or keypress retries it. There is no dedicated hero play button. A labelled mute/unmute control remains available.
- Previews pause when the tab is hidden and continue through the five clips in order while the page is active.
- The temporary cover artwork reuses supplied photos. Replace the `covers` array in `app.js` and the corresponding images when final artwork is ready.
- Featured Releases and In the Spotlight read the current playlist order through YouTube’s official player API on each page load. Their first four thumbnails and links therefore follow the configured playlists rather than bundled snapshots.
- Spotify uses the official artist iframe only, with no API or credentials.
- The Spotify embed requires an internet connection and can vary by browser, region and privacy settings. YouTube cards always retain direct official links. Spotify and Google Fonts contact their respective services.

## Content and assets

The exact supplied short bio is in `index.html`. The final supplied logo, hero image, About image and all five audio files are included. Eight selected archive photos are bundled locally; source URLs are listed in `ASSET-SOURCES.txt`.

The supplied `cc.jpg` remains in About Sonali. The refreshed hero, Spotify background, Sonali & The Escape artwork and Apple Music artwork are included as local assets. Spotify pairs the Sonali logo and introductory copy with the official player. Apple Music uses the official player for the latest release, “Saregama - Single.” The band subpage includes a responsive temporary archive gallery ready for the final band photographs. Contact social links use accessible, labelled icons.

Typography uses Poppins throughout to match the supplied bold geometric reference. The hero preview player includes a compact play/pause control.

The archive filmstrip continuously moves right to left. Visitors can pause it. Hover also pauses it. Reduced-motion settings disable animation and make the strip horizontally scrollable.

## Search and accessibility

Page titles, descriptions, Open Graph text, semantic landmarks, image descriptions, keyboard focus styles, a skip link, form labels, responsive layouts and reduced-motion support are included. A small brand-colour favicon is included. Before publishing, add the final canonical URL and absolute `og:url`/`og:image` URLs once the hosting address and sharing image are confirmed. No unconfirmed domain has been assigned.

The site optionally exposes a section-navigation tool in browsers implementing `document.modelContext`. Unsupported browsers ignore this enhancement.

## Files

- `index.html` — full artist landing page
- `band.html` — requested band placeholder subpage
- `styles.css` — responsive dark cinematic design
- `app.js` — interactions, audio, playlists, form validation
- `config.js` — email endpoint and playlist identifiers
- `assets/` — local portraits, logo, gallery, thumbnails and five MP3s
- `ASSET-SOURCES.txt` — asset provenance

Footer: © 2026 Sonali Lindsay
