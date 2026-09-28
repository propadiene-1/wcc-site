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
- **Text:** replace the `<p data-ph="Add text"></p>` lines with `<p></p>`.
- **Event filters**: set filters or add new categories using each event's `data-category="..."`.
- **Photos:** save photos in `images/`, then use
  `<div class="photo"><img src="images/your-photo.jpg" alt="Short description"></div>`.f
  - **Mosaic layout**: use `<div class="mosaic">` 1 large + 4 small photos or `mosaic mosaic--3` for 1 large + 2 stacked
  - **Photo row layout**: use `<div class="photo-row">` equal photos side by side.
  - **Page banners:** replace `<div class="banner-bg"></div>` with an `<img>` to use a photo as the header.
  - Photo proportions can be changed using `photo--wide`, `photo--square`, or `photo--tall`.

## Logo
Logo is saved as `images/logo.svg` and configured using `logo.file` in `site.js`. 
- SVG files are automatically set under logo colors at the top of `styles.css`.
- use `headerStyle: "badge"` to put the logo in navy circle, or `"plain"` to omit it
- favicon is saved as `images/favicon.svg`.

## Forms
- **Google Forms:** paste the form link into `data-src=""` within `<div class="embed" ...>`.
- **Mailing list & contact forms:** paste form IDs into `forms` at the top of `site.js` to connect to Formspree. Without this, submitting opens an email instead.

## Design panel and placeholders
- `showDesignPanel: false` hides the "Customize design" button.
- `showPlaceholders: false` hides any dashed boxes you haven't filled.

## Deployment
Details are in `DEPLOY.md`, including google form linking instructions.
