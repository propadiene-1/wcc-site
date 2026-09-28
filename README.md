# Wellesley Consulting Club website

HTML site for the Wellesley Consulting Club

## Files
| File | Contents |
|---|---|
| `index.html` | Club overview with group photo, what we do, and mailing list |
| `about.html` | E-board and case team headshots |
| `clients.html` | Current client, past clients, contact prompt |
| `events.html` | Current and past events |
| `join.html` | Links to get involved and contact form |
| `styles.css` | Brand colors and fonts (at the top) and main layout |
| `site.js` | Club name, email, social links, nav bar, header/footer, interactive components |
| `images/` | Put your photos here |

## Customizing content
- **Text:** use any line with `<p data-ph="Add text"></p>` or add your own.
- **Photos:** save photos in `images/`, then use
  `<div class="photo"><img src="images/your-photo.jpg" alt="Short description"></div>`.f
  - **Mosaic layout** (`<div class="mosaic">`): 1 large + 4 small photos or `mosaic mosaic--3` for 1 large + 2 stacked
  - **Photo row layout** (`<div class="photo-row">`): equal photos side by side.
  - **Wide group photo** (`photo photo--wide`): above the e-board and case team grids.
  - **Banner background photo:** every navy banner uses `<div class="banner-bg"></div>`. Replace with an `<img>` to use a photo as the header.
  - Photo proportions can be changed using `photo--wide`, `photo--square`, or `photo--tall`.
- **Event filters** set filters or add new categories using each event's `data-category="..."`.

## Logo
Saved as `images/logo.svg`, configured using `logo.file` in `site.js`. 
- SVG files are automatically set under logo colors at the top of `styles.css`.
- use `headerStyle: "badge"` to put the logo in navy circle, or `"plain"` to omit it
- favicon is saved as `images/favicon.svg`.

## Forms
- **Google Form (join.html):** paste the form link into `data-src=""` on the `<div class="embed" ...>`.
- **Mailing list & contact forms:** connect them to Formspree by pasting your form IDs into `forms` at the top of `site.js` (see `DEPLOY.md`). Without this, submitting opens an email instead.

## Design panel and placeholders
- `showDesignPanel: false` hides the "Customize design" button.
- `showPlaceholders: false` hides any dashed boxes you haven't filled.
