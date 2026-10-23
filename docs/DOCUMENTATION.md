# industrialpmr one-page site: Documentation

React 19 + Vite 6 port of the original static site. Visual output is pixel-identical to the original at 1366px and 390px widths (checked with full-page screenshots).

## 1. Quick start

Requires Node 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve dist/ locally
npm test           # run the test suite once
npm run test:watch # tests in watch mode
```

The "Request a call" form posts to `/api/lead`. The Vite dev server proxies `/api` to `http://localhost:3000`, so run `npx vercel dev --listen 3000` in a second terminal to test the form end to end. Without it the form shows the generic error message.

## 2. Project structure

```
index.html                  Vite entry: <head> meta, favicon, font preload, #root
vercel.json                 Vercel headers and cleanUrls (unchanged from original)
vite.config.js              Vite + Vitest config, /api dev proxy
api/lead.js                 Vercel serverless function for call requests
public/assets/              Static files served as-is at /assets/*
  logo-full.svg  logo-mark.svg  laptop.png  fonts/archivo-*.woff2
src/
  main.jsx                  React bootstrap, imports styles.css
  App.jsx                   Page layout; owns menu state and the open-dialog action
  styles.css                Original stylesheet (only the font URL changed to /assets/...)
  components/
    Header.jsx              Logo, nav, dashboard link, burger + mobile menu
    Hero.jsx                Headline, animated trace SVG, laptop image
    Band.jsx                Scrolling ticker (decorative, aria-hidden)
    Features.jsx            Renders feature groups from data
    Call.jsx                Phone number call-to-action
    Address.jsx             Office address + embedded Google map
    Footer.jsx              Full logo, contact details, links, legal line
    CallModal.jsx           <dialog> with the request form
  data/featureGroups.jsx    All Features text and group icons
  hooks/useLeadForm.js      Form state, validation, submit, auto-close
  lib/lead.js               isValidPhone() and submitLead() (the fetch call)
tests/                      Vitest suites (see section 6)
```

## 3. How it works

**Opening the dialog.** `App` holds a ref to the `<dialog>` and passes `openCall` to the Header, Hero, Call section and the floating dock button. `openCall` closes the mobile menu and calls `showModal()` (falling back to the `open` attribute on old browsers, as the original did).

**Mobile menu.** `menuOpen` state in `App` drives the burger's `aria-expanded` and the menu's `hidden` attribute. Clicking a link inside the menu closes it.

**Request a call flow.**
1. `useLeadForm` reads the phone field and rejects numbers with fewer than 7 digits.
2. `submitLead` POSTs `{ type: 'call', phone, website }` to `/api/lead`.
3. On success the form resets and the dialog closes after 1.8 s. On failure the server's error (or a generic message with the support number) is shown.
4. The hidden `website` field is a honeypot. Real users never fill it.

**API (`api/lead.js`).** Accepts POST only (405 otherwise), silently returns 200 for honeypot hits, returns 400 for invalid numbers, logs the lead, and forwards it to `LEAD_WEBHOOK_URL` if set. A failing webhook is logged but does not fail the request.

## 4. Editing content

| To change | Edit |
|---|---|
| Feature groups, titles, row text, group icons | `src/data/featureGroups.jsx` |
| Hero text, footer, call section, nav | the matching file in `src/components/` |
| Colours, fonts, spacing | CSS variables at the top of `src/styles.css` |
| Page title, meta description, favicon | `index.html` |
| Images | replace the files in `public/assets/` (keep the file names) |

## 5. Deployment (Vercel)

1. Push the project to GitHub and import it in Vercel.
2. Framework preset: **Vite** (build `npm run build`, output `dist`).
3. Optional environment variable: `LEAD_WEBHOOK_URL`, a URL (Slack, Zapier, Make, n8n, Apps Script) that receives each request as JSON. Without it, requests only appear in Vercel → Logs.

## 6. Tests

`npm test` runs 31 tests with Vitest, jsdom and Testing Library.

| File | Covers |
|---|---|
| `tests/lead.test.js` | `isValidPhone` cases; `submitLead` request shape, server error, non-JSON error fallback |
| `tests/api.test.js` | 405 for non-POST, 400 for bad phone, honeypot, string body, webhook forward, webhook failure |
| `tests/assets.test.jsx` | Every `<img>`, the favicon and the font preload point at real files in `public/` |
| `tests/address.test.jsx` | Address section + map iframe, footer no longer has address/phones, email under Powered by |
| `tests/app.test.jsx` | Sections render; all feature groups and rows render; nav anchors resolve; mobile menu toggle; dialog open/cancel; validation error; success flow; server error flow |

`tests/setup.js` stubs `showModal()`/`close()`, which jsdom doesn't implement.

Not covered by automated tests: the scrolling ticker and hero animation (CSS only), and real browser layout. Layout was verified separately by comparing screenshots with the original.

## 7. Differences from the original

- `script.js` is replaced by React state and the `useLeadForm` hook. Behavior is the same.
- `api/lead.js` now uses `export default` instead of `module.exports`, because the package is `"type": "module"` and Vercel would otherwise fail to load the CJS export. The handler logic is unchanged.
- Asset paths are absolute (`/assets/...`) and the files live in `public/`.
- Features markup is generated from `src/data/featureGroups.jsx`. The rendered HTML is the same.
