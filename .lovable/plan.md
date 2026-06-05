## Plan

The OG/Twitter meta tags in `index.html` already match exactly what was requested (added in a previous turn) — no HTML changes needed.

The only change is to replace `public/og-image.jpg` with the uploaded YC gold crest image so social previews use the new artwork.

### Steps
1. Copy `user-uploads://hf_20260605_175353_...png` to `public/og-image.jpg`, resized/letterboxed to 1200×630 JPG (to match the declared `og:image:width`/`height` and keep WhatsApp/Facebook happy).
2. Verify the file exists at `public/og-image.jpg` at 1200×630.

### Not changing
- `index.html` — meta tags already correct and identical to the requested block.
- Any other file.

Note: the production OG URL points to `https://fernandez-media.github.io/og-image.jpg`. The new image will only appear in previews once that host serves the updated file (i.e. after deploy to that GitHub Pages site).
