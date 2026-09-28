# Wellesley Consulting Club website

HTML site for the Wellesley Consulting Club

## Files
| File | Contents |
|---|---|
| `index.html` | Club overview and mailing list |
| `about.html` | E-board and case team |
| `clients.html` | Current/past clients and contact form |
| `events.html` | Current and past events |
| `join.html` | Instructions for joining and contact form |
| `styles.css` | Main layout and brand colors/fonts (at the top) |
| `site.js` | Nav bar, header/footer, and interactive components |
| `images/` | Photos |

## Customizing content
- **Text:** replace the `<p data-ph="Add text"></p>` lines.
- **Event filters**: `data-category="..."` (one for each event)
- **Photos:** `<div class="photo"><img src="images/your-photo.jpg" alt="Short description"></div>`
  - **Mosaic layout**: `<div class="mosaic">` (1 large + 4 small) or `mosaic mosaic--3` (large + 2 small)
  - **Equal row of photos**: `<div class="photo-row">`
  - **Page banners:** `<div class="banner-bg"></div>` (replace with `<img>` to use a photo)
  - **Photo proportions**: `photo--wide`, `photo--square`, or `photo--tall`.

## Logo
Logo is saved as `images/logo.svg` and configured using `logo.file` in `site.js`. 
- SVG files are automatically set under logo colors at the top of `styles.css`.
- use `headerStyle: "badge"` to put the logo in navy circle, or `"plain"` to omit it
- favicon is saved as `images/favicon.svg`.

## Forms
- **Google Forms:** paste the form link into `data-src=""` within `<div class="embed" ...>`.
- **Mailing list & contact forms:** paste form IDs into `forms` at the top of `site.js` to connect to Formspree. Without this, the submit button will open an email.

## Design panel and placeholders
- `showDesignPanel: false` hides the "Customize design" button.
- `showPlaceholders: false` hides any dashed boxes you haven't filled.

## Deployment
Details are in `DEPLOY.md`, including google form linking instructions.
