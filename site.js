/* =====================================================================
   WELLESLEY CONSULTING CLUB — SHARED SCRIPT
   Builds the header and footer on every page, and powers the forms,
   the events popups, and the design panel.
   ===================================================================== */

/* 1. SITE SETTINGS — edit these ------------------------------------- */
const CONFIG = {
  name: "Wellesley Consulting Club",
  shortName: "WCC",
  email: "wellesleyconsulting@wellesley.edu",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/wellesleyconsulting/" },
    { label: "LinkedIn",  href: "https://www.linkedin.com/company/wellesley-consulting-club/" },
  ],
  nav: [
    { label: "Home",    href: "index.html" },
    { label: "About",   href: "pages/about.html" },
    { label: "Clients", href: "pages/clients.html" },
    { label: "Events",  href: "pages/events.html" },
  ],
  navButton: { label: "Get involved", href: "pages/join.html" },

  // Formspree form IDs (the part after formspree.io/f/). See DEPLOY.md.
  // Until these are filled in, submitting a form opens an email instead.
  forms: {
    mailingList: "",   // e.g. "xyzabcde"
    contact:     "",
  },

  // LOGO
  // file:        your logo in the images folder (.svg or .png)
  // recolor:     true = an SVG logo takes on the site's colors automatically
  //              (colors are set in styles.css under "Logo colors").
  //              Use false for multicolor SVGs you want to keep as-is.
  // fileOnLight: optional second version for light backgrounds. Only needed
  //              for PNGs or recolor:false, e.g. "images/logo-navy.png".
  // headerStyle: "badge" = logo inside a navy circle, "plain" = logo alone.
  logo: {
    file: "images/logo.svg",
    recolor: true,
    fileOnLight: "",
    headerStyle: "badge",
  },

  //showDesignPanel: true,    // set to false before going live
  showPlaceholders: true,   // set to false to hide any dashed boxes you haven't filled
};

// The site's main folder, worked out from where site.js lives, so links
// and images work from both index.html and the pages/ folder.
const ROOT = document.currentScript.src.replace(/site\.js(\?.*)?$/, "");
const url = p => /^(https?:|mailto:|#|\/)/.test(p) ? p : ROOT + p;

/* 2. LOGO LOADER ---------------------------------------------------- */
// Built-in fallback drawing, used only if no logo file is set.
function builtInLogo() {
  return `<svg viewBox="0 0 100 100" aria-hidden="true" fill="none">
    <circle cx="50" cy="50" r="41" stroke="currentColor" stroke-width="8"/>
    <path d="M50 17 A33 33 0 1 1 50 83 A26 33 0 1 0 50 17 Z" fill="currentColor"/>
    <text x="49" y="62" text-anchor="middle" font-family="Georgia, serif" font-size="32" fill="currentColor">W</text>
  </svg>`;
}

// Turns every color in an SVG into "currentColor" so CSS can color it.
function recolorSVG(text) {
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg || doc.querySelector("parsererror")) return null;
  const toCurrent = v => v && v !== "none" && !v.startsWith("url(") ? "currentColor" : v;
  svg.querySelectorAll("*").forEach(el => {
    ["fill", "stroke"].forEach(a => { if (el.hasAttribute(a)) el.setAttribute(a, toCurrent(el.getAttribute(a))); });
    if (el.getAttribute("style")) el.setAttribute("style", el.getAttribute("style").replace(/(fill|stroke)\s*:\s*(?!none)[^;]+/g, "$1:currentColor"));
  });
  svg.querySelectorAll("style").forEach(st => st.textContent = st.textContent.replace(/(fill|stroke)\s*:\s*(?!none)[^;}]+/g, "$1:currentColor"));
  if (!svg.hasAttribute("fill")) svg.setAttribute("fill", "currentColor");
  if (!svg.hasAttribute("viewBox") && svg.getAttribute("width")) svg.setAttribute("viewBox", `0 0 ${parseFloat(svg.getAttribute("width"))} ${parseFloat(svg.getAttribute("height"))}`);
  svg.removeAttribute("width"); svg.removeAttribute("height");
  svg.setAttribute("aria-hidden", "true");
  return svg.outerHTML;
}

let logoSVG = null;  // filled in once the logo file loads
const logoPromise = (async () => {
  const L = CONFIG.logo || {};
  if (!L.file) { logoSVG = builtInLogo(); return; }
  if (L.recolor !== false && /\.svg$/i.test(L.file)) {
    try { logoSVG = recolorSVG(await (await fetch(url(L.file))).text()); } catch { /* opened as a local file: fall back to <img> */ }
  }
})();

// Fills a logo spot. place = "navy" (on a dark background) or "light".
function paintLogo(el) {
  const L = CONFIG.logo || {};
  const place = el.dataset.logo || "navy";
  if (logoSVG) { el.innerHTML = logoSVG; return; }
  const src = (place === "light" && L.fileOnLight) || L.file;
  el.innerHTML = `<img src="${url(src)}" alt="">`;
}

/* ===================================================================
   You shouldn't need to edit below this line.
   =================================================================== */
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// Works with both "about.html" and clean URLs like "/about"
const pageName = p => (p.split("#")[0].split("/").pop() || "index").replace(/\.html$/, "");
const currentPage = pageName(location.pathname);
const isCurrent = href => pageName(href) === currentPage;

if (!CONFIG.showPlaceholders) document.documentElement.classList.add("live");

/* Header */
const headerEl = document.getElementById("site-header");
if (headerEl) {
  const a = (n, cls = "") => `<a ${cls} href="${esc(url(n.href))}" ${isCurrent(n.href) ? 'aria-current="page"' : ""}>${esc(n.label)}</a>`;
  headerEl.outerHTML = `
  <header class="header"><div class="wrap">
    <a class="brand" href="${url("index.html")}"><span class="brand-mark brand-mark--${esc((CONFIG.logo || {}).headerStyle || "badge")}" data-logo="${(CONFIG.logo || {}).headerStyle === "plain" ? "light" : "navy"}"></span>
      <span class="brand-name"><span class="name-full">${esc(CONFIG.name)}</span><span class="name-short">${esc(CONFIG.shortName)}</span></span></a>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
    </button>
    <nav class="nav">${CONFIG.nav.map(n => a(n)).join("")}${a(CONFIG.navButton, 'class="btn btn--solid"')}</nav>
  </div></header>`;
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
  toggle.addEventListener("click", () => { const o = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); });
}

/* Footer */
const footerEl = document.getElementById("site-footer");
if (footerEl) {
  footerEl.outerHTML = `
  <footer class="footer"><div class="wrap">
    <div class="footer-top">
      <a class="brand" href="${url("index.html")}"><span class="brand-mark" data-logo="navy"></span><span class="brand-name">${esc(CONFIG.name)}</span></a>
      <div class="footer-links"><a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>${CONFIG.socials.map(s => `<a href="${esc(s.href)}">${esc(s.label)}</a>`).join("")}</div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${esc(CONFIG.name)}</span></div>
  </div></footer>`;
}

/* Logo wherever data-logo appears (header, footer, banner watermarks) */
logoPromise.then(() => document.querySelectorAll("[data-logo]").forEach(paintLogo));

/* Email and social fill-ins */
document.querySelectorAll("[data-email]").forEach(el => { el.href = `mailto:${CONFIG.email}`; el.textContent = CONFIG.email; });
document.querySelectorAll("[data-socials]").forEach(el => el.innerHTML = CONFIG.socials.map(s => `<a class="text-link" href="${esc(s.href)}">${esc(s.label)}</a>`).join(""));

/* Google Form embed: <div class="embed" data-src="YOUR GOOGLE FORM LINK"> */
document.querySelectorAll(".embed[data-src]").forEach(el => {
  const src = el.dataset.src.trim();
  const btn = document.querySelector(`[data-embed-link="${el.id}"]`);
  if (!src) { if (btn) btn.hidden = true; return; }
  const url = src.includes("embedded=true") ? src : src + (src.includes("?") ? "&" : "?") + "embedded=true";
  el.innerHTML = `<iframe src="${esc(url)}" title="Application form" loading="lazy">Loading…</iframe>`;
  if (btn) btn.href = src;
});

/* Forms: sent to Formspree using the IDs in CONFIG.forms. If an ID is
   missing (or you're viewing the files locally), submitting opens an email. */
document.querySelectorAll("form[data-form]").forEach(form => {
  const id = (CONFIG.forms || {})[form.dataset.formspree] || "";
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const status = form.querySelector(".form-status");
    const data = new FormData(form);
    if (data.get("_gotcha")) return;  // spam bot
    if (!id || location.protocol === "file:") {
      const lines = [...data.entries()].filter(([k]) => k !== "_gotcha").map(([k, v]) => `${k}: ${v}`).join("\n");
      const a = document.createElement("a");
      a.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(form.dataset.form)}&body=${encodeURIComponent(lines)}`;
      a.click();
      return;
    }
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      const res = await fetch(`https://formspree.io/f/${id}`, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset();
      if (status) status.textContent = form.dataset.success || "Thanks! We'll be in touch.";
    } catch {
      if (status) status.textContent = `That didn't go through. Email us at ${CONFIG.email} instead.`;
    } finally {
      btn.disabled = false;
    }
  });
});

/* Events: filters + popup ------------------------------------------ */
const eventGrids = document.querySelectorAll(".events");
if (eventGrids.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "event-dialog";
  document.body.append(dialog);
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

  eventGrids.forEach(grid => {
    const events = [...grid.querySelectorAll(".event")];

    // Filter buttons (only in sections that have <div class="filters">)
    const filterBar = grid.parentElement.querySelector(".filters");
    const cats = [...new Set(events.map(ev => ev.dataset.category).filter(Boolean))];
    if (filterBar && cats.length > 1) {
      filterBar.innerHTML = ["All", ...cats].map((c, i) => `<button class="filter" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
      filterBar.addEventListener("click", e => {
        const b = e.target.closest(".filter"); if (!b) return;
        filterBar.querySelectorAll(".filter").forEach(f => f.setAttribute("aria-pressed", f === b));
        events.forEach(ev => ev.hidden = b.dataset.cat !== "All" && ev.dataset.category !== b.dataset.cat);
      });
    }

    // Popup with highlights and photos
    events.forEach(ev => {
      ev.querySelector(".event-open").addEventListener("click", () => {
        const title = ev.querySelector("h3").outerHTML.replace("<h3", "<h2").replace("</h3>", "</h2>");
        const meta = ev.querySelector(".event-meta").outerHTML;
        dialog.innerHTML = `<div class="dialog-inner">
          <div class="dialog-top"><div class="stack" style="gap:.5rem">${meta}${title}</div>
            <button class="dialog-close" aria-label="Close">×</button></div>
          ${ev.querySelector(".event-details").innerHTML}</div>`;
        dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
        dialog.showModal();
      });
    });
  });
}

/* ===================================================================
   6. DESIGN PANEL — live editor for colors, fonts & corners.
   Changes are saved in your browser. "Copy code" gives you a :root
   block to paste at the top of styles.css to make them permanent.
   ===================================================================== */
if (CONFIG.showDesignPanel) (function () {
  const FONTS_HEAD = {
    "Fraunces":          `"Fraunces", Georgia, serif`,
    "Georgia":           `Georgia, "Times New Roman", serif`,
    "Libre Baskerville": `"Libre Baskerville", Georgia, serif`,
    "Inter (sans)":      `"Inter", Arial, sans-serif`,
  };
  const FONTS_BODY = {
    "Aptos / Arial":  `Aptos, "Segoe UI", Arial, Helvetica, sans-serif`,
    "Arial":          `Arial, Helvetica, sans-serif`,
    "Inter":          `"Inter", Arial, sans-serif`,
    "Source Sans 3":  `"Source Sans 3", Arial, sans-serif`,
    "Georgia (serif)":`Georgia, serif`,
  };
  const COLORS = [
    ["--brand", "Navy"], ["--brand-deep", "Deep navy (footer)"], ["--brand-ink", "Text on navy"],
    ["--accent", "Gold accent"], ["--secondary", "Slate blue"],
    ["--bg", "Background"], ["--surface", "Alt. background"], ["--text", "Text"], ["--muted", "Muted text"],
  ];
  const root = document.documentElement;
  const defaults = {};
  const cs = getComputedStyle(root);
  COLORS.forEach(([v]) => defaults[v] = cs.getPropertyValue(v).trim());
  defaults["--font-heading"] = FONTS_HEAD["Fraunces"];
  defaults["--font-body"] = FONTS_BODY["Aptos / Arial"];
  defaults["--radius"] = "4px";

  let state = {};
  try { state = JSON.parse(localStorage.getItem("site-design") || "{}"); } catch (e) { state = {}; }
  const apply = () => {
    Object.entries(state).forEach(([k, v]) => root.style.setProperty(k, v));
    try { localStorage.setItem("site-design", JSON.stringify(state)); } catch (e) {}
    const out = document.getElementById("cz-code");
    if (out) out.value = ":root {\n" + Object.keys(defaults).map(k => `  ${k}: ${state[k] || defaults[k]};`).join("\n") + "\n}";
  };
  const val = k => state[k] || defaults[k];
  const opt = (map, cur) => Object.entries(map).map(([n, v]) => `<option value='${v}' ${v === cur ? "selected" : ""}>${n}</option>`).join("");

  const btn = document.createElement("button");
  btn.className = "cz-toggle"; btn.textContent = "Customize design";
  const panel = document.createElement("div");
  panel.className = "cz"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Customize design");
  panel.innerHTML = `
    <h5>Customize design</h5>
    <small>Changes preview instantly and are saved in this browser.</small>
    <div class="cz-group">Colors</div>
    ${COLORS.map(([v, l]) => `<label class="cz-row">${l}<input type="color" data-var="${v}" value="${/^#[0-9a-f]{6}$/i.test(val(v)) ? val(v) : "#000000"}"></label>`).join("")}
    <div class="cz-group">Fonts</div>
    <label class="cz-row">Headings<select data-var="--font-heading">${opt(FONTS_HEAD, val("--font-heading"))}</select></label>
    <label class="cz-row">Body<select data-var="--font-body">${opt(FONTS_BODY, val("--font-body"))}</select></label>
    <div class="cz-group">Shape</div>
    <label class="cz-row">Corner roundness<input type="range" min="0" max="20" data-var="--radius" data-unit="px" value="${parseInt(val("--radius"))}"></label>
    <div class="cz-group">Make it permanent</div>
    <small style="margin:0">Copy this and replace the matching lines at the top of styles.css.</small>
    <textarea id="cz-code" readonly></textarea>
    <div class="cz-actions"><button id="cz-copy">Copy code</button><button id="cz-reset">Reset</button></div>`;
  document.body.append(btn, panel);

  btn.addEventListener("click", () => panel.classList.toggle("open"));
  panel.addEventListener("input", e => {
    const v = e.target.dataset.var; if (!v) return;
    state[v] = e.target.value + (e.target.dataset.unit || "");
    apply();
  });
  document.getElementById("cz-copy").addEventListener("click", async e => {
    const ta = document.getElementById("cz-code");
    try { await navigator.clipboard.writeText(ta.value); } catch (err) { ta.select(); document.execCommand && document.execCommand("copy"); }
    e.target.textContent = "Copied"; setTimeout(() => e.target.textContent = "Copy code", 1500);
  });
  document.getElementById("cz-reset").addEventListener("click", () => {
    Object.keys(state).forEach(k => root.style.removeProperty(k));
    state = {}; try { localStorage.removeItem("site-design"); } catch (e) {}
    panel.querySelectorAll("[data-var]").forEach(el => {
      const d = defaults[el.dataset.var];
      el.value = el.type === "range" ? parseInt(d) : d;
    });
    apply();
  });
  apply();
})();