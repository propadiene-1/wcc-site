# Wellesley Consulting Club website

A plain HTML/CSS/JS site. No build tools needed. Open `index.html` in a browser to preview.

## Files
| File | What it's for |
|---|---|
| `index.html` | Home: overview, group photo, what we do, clients strip, mailing list |
| `about.html` | Mission, executive board, case team |
| `clients.html` | Current client, past clients, contact prompt |
| `events.html` | Past events with filter buttons and popups |
| `join.html` | How to get involved, Google Form application, contact form |
| `styles.css` | All colors, fonts and layout. **Brand colors and fonts are at the top.** |
| `site.js` | Club name, email, social links, nav menu (top of file), plus the header/footer and interactive bits |
| `images/` | Put your photos here |

## Filling in content
- **Text:** find an empty tag like `<p data-ph="Add text"></p>` and type inside it: `<p>Your words</p>`.
- **Photos:** save the photo in `images/`, then change
  `<div class="photo" data-ph="Add photo"></div>` to
  `<div class="photo"><img src="images/your-photo.jpg" alt="Short description"></div>`.
- Dashed boxes disappear automatically once filled. The tag must be completely empty (no spaces) to show one.
- **People / events / logos:** copy an existing block (it's marked with a comment) and paste it to add more.
- **Event filters** come from each event's `data-category="..."`. New categories get a button automatically.

## Logo
Your logo is `images/logo.svg`. To swap it, replace that file (or change `logo.file` in `site.js`).

- **SVG (recommended):** with `recolor: true`, the logo automatically takes the site's colors: white in the header circle and banners, gold in the footer. Change those colors under **Logo colors** at the top of `styles.css`. This works for single-color logos; for a multicolor SVG, set `recolor: false`.
- **PNG:** set `file: "images/logo.png"`. PNG colors can't be changed by code, so if you use `headerStyle: "plain"` (logo without the navy circle), also upload a dark version and set `fileOnLight: "images/logo-navy.png"`.
- **Header look:** `headerStyle: "badge"` puts the logo in a navy circle; `"plain"` shows it on its own.
- `images/favicon.svg` is the browser-tab icon (logo on a navy circle).
- Recoloring only works when the site is served (live, or via a local server). If you double-click `index.html`, the logo shows in its original white.

## Photo layouts
Every photo spot is `<div class="photo" data-ph="..."></div>`. Put an `<img>` inside to fill it. Layouts ready to use:
- **Mosaic** (`<div class="mosaic">`): 1 large + 4 small photos. The first photo is the large one. `mosaic mosaic--3` is 1 large + 2 stacked.
- **Photo row** (`<div class="photo-row">`): equal photos side by side, with optional captions.
- **Wide group photo** (`photo photo--wide`): above the e-board and case team grids.
- **Banner background photo:** every navy banner has `<div class="banner-bg"></div>`. Put an `<img>` inside and the photo appears behind the headline with a navy tint. Leave it empty to keep solid navy.
- Shapes: add `photo--wide`, `photo--square`, or `photo--tall` to change a photo's proportions.

Tip: resize photos to about 2000px wide and under 1 MB (squoosh.app is free).

## Forms
- **Google Form (join.html):** paste your form link into `data-src=""` on the `<div class="embed" ...>`.
- **Mailing list & contact forms:** connect them to Formspree by pasting your form IDs into `forms` at the top of `site.js` (see `DEPLOY.md`). Until then, submitting opens an email instead.

## Before going live (site.js)
- `showDesignPanel: false` removes the "Customize design" button.
- `showPlaceholders: false` hides any dashed boxes you haven't filled.
- Update `email` and `socials`.

## Going live
See **DEPLOY.md** for step-by-step instructions to publish on GitHub Pages and connect a Namecheap domain.
