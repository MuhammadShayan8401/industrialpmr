# industrialpmr: Documentation

React 19 + Vite 6 site for industrialpmr. The landing page is one scrolling layout (header, hero, feature list, call section, office address and map, footer). Four standalone pages (Documentation, API Status, Terms & Conditions, Privacy Policy) share its header, footer and styles.

## 1. Quick start

Requires Node 18+.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build -> dist/
npm run preview      # serve dist/ locally
npm test             # run the test suite once
npm run test:watch   # tests in watch mode
npm run lint         # ESLint
npm run format       # Prettier (write)
npm run format:check # Prettier (check only)
```

The "Request a call" form posts to `/api/lead`. The dev server proxies `/api/*` to `http://localhost:3000`, so run `npx vercel dev --listen 3000` in a second terminal to test the form end to end. Without it the form shows the generic error message.

## 2. Project structure

```
index.html, docs.html,        HTML entry points (one per page): meta tags, favicon, font preload
api-status.html, terms.html,
privacy.html
vite.config.js                Vite + Vitest config, multi-page build, dev route rewrites, /api proxy
vercel.json                   Security headers, cache headers, cleanUrls
eslint.config.js              ESLint flat config
.prettierrc.json              Prettier options
.editorconfig                 Editor defaults
.env.example                  Environment variables (LEAD_WEBHOOK_URL)
status.html                   Entry for the three status pages (/status, /status/maintenance, /status/incidents)
api/lead.js                   Vercel serverless function for call requests
public/assets/                Static files served as-is at /assets/*
  logo-full.svg  logo-mark.svg  laptop.svg  fonts/archivo-*.woff2
src/
  main.jsx                    Landing page bootstrap
  info.jsx                    Bootstrap for the standalone pages (reads data-page)
  App.jsx                     Landing page layout; owns menu state and the dialog action
  styles.css                  All styles; design tokens at the top
  components/
    Header.jsx                Logo, nav, dashboard link, burger + mobile menu
    Hero.jsx                  Headline, animated trace SVG, laptop image
    Band.jsx                  Scrolling ticker (decorative, aria-hidden)
    Features.jsx              Renders feature groups from data
    Call.jsx                  Phone number call-to-action
    Address.jsx               Office address + embedded Google map
    Footer.jsx                Logo, Support / Legal / Powered by links, legal line
    CallModal.jsx             <dialog> with the request form
  pages/InfoPage.jsx          Template and content for the standalone pages
  status/                     System status pages (see section 5)
    main.jsx, StatusApp.jsx   Entry, header with tabs, picks the view from the path
    views/                    StatusView (live status), PeriodView (maintenance / incidents)
    components/               ServiceGroup, UptimeBar, ResponseChart, StatusBadge, StatusIcon
    api.js                    fetchSummary() and fetchEvents(): the only code that calls the API
    adapters.js               Maps your API responses to the shape the UI uses
    mockData.js               Sample data for development and tests
    statuses.js, format.js    Status vocabulary, overall status, date formatting
    useSummary.js, useEvents.js  Data hooks (the footer also uses useSummary)
    status.css                Styles for the status pages (self-contained)
  data/featureGroups.jsx      Feature text and group icons
  hooks/useLeadForm.js        Form state, validation, submit, auto-close
  lib/lead.js                 isValidPhone() and submitLead()
tests/                        Vitest suites (see section 8)
docs/DOCUMENTATION.md         This file
```

## 3. How it works

**Opening the dialog.** `App` holds a ref to the `<dialog>` and passes `openCall` to the Header, Hero, Call section and the floating dock button. `openCall` closes the mobile menu and calls `showModal()` (falling back to the `open` attribute on old browsers).

**Mobile menu.** `menuOpen` state in `App` drives the burger's `aria-expanded` and the menu's `hidden` attribute. Clicking a link inside the menu closes it.

**Scroll reveal.** An effect in `App` adds `.reveal` to selected elements and an `IntersectionObserver` adds `.is-visible` the first time each one scrolls into view.

**Request a call flow.**

1. `useLeadForm` reads the phone field and validates it with `isValidPhone` (digits, spaces, `+`, `()`, `-`; at least 7 digits; at most 40 characters).
2. `submitLead` POSTs `{ type: 'call', phone, website }` to `/api/lead`.
3. On success the form resets and the dialog closes after 1.8 s. On failure the server's error (or a generic message with the support number) is shown.
4. The hidden `website` field is a honeypot. Real users never fill it.

**API (`api/lead.js`).** Accepts POST only (405 otherwise). Silently returns 200 for honeypot hits, 400 for invalid numbers (same rule as the form), logs the lead, and forwards it to `LEAD_WEBHOOK_URL` if set. The webhook call times out after 5 seconds. A failing webhook is logged but does not fail the request.

## 4. Standalone pages

| Route         | Entry file        | Content            |
| ------------- | ----------------- | ------------------ |
| `/docs`       | `docs.html`       | Documentation      |
| `/api-status` | `api-status.html` | API                |
| `/terms`      | `terms.html`      | Terms & Conditions |
| `/privacy`    | `privacy.html`    | Privacy Policy     |

- Every entry loads `src/info.jsx`, which renders `src/pages/InfoPage.jsx` for the page named in `data-page`. Title, eyebrow, text, heading and paragraphs live in the `pages` object in `InfoPage.jsx`.
- `Header` takes an optional `base="/"` so its anchors point back to the landing page. `Footer` takes an optional `home` for the logo link. The defaults keep the landing page behaviour.
- `/api-status` is used instead of `/api` because `/api/*` belongs to the serverless functions. The dev proxy matches `^/api/` only.
- `vite.config.js` builds all HTML entries and rewrites the routes above in dev and preview. In production Vercel's `cleanUrls` serves the matching `.html` files.
- To add a page: create `<name>.html` (copy an existing one and change `data-page`), add it to `pages` in `InfoPage.jsx`, and add it to `pageRoutes` and `build.rollupOptions.input` in `vite.config.js`.

## 5. Status pages

`/status` shows live service status, `/status/maintenance` lists maintenance windows, and `/status/incidents` lists past incidents. All three are served by `status.html` and pick their view from the path. The footer on every page also shows the current overall state ("All systems operational") and links to `/status`.

**Connecting your APIs.** Until the real APIs exist the pages run on sample data in development and tests only. In production without an API the page shows "Live status isn't available right now" and the footer link falls back to a plain "System status" link, so no sample data is ever shown to customers by accident.

1. Set `VITE_STATUS_API_URL` (Vercel → Settings → Environment Variables, or `.env` locally) to the base URL of your API.
2. Add the API's origin to `connect-src` in `vercel.json`.
3. Open `src/status/adapters.js` and map your API fields to the shape below. If your API already returns this shape no change is needed.
4. If your endpoints are named differently, change the paths in `src/status/api.js` (three calls).

To preview the sample data on a deployed site set `VITE_STATUS_USE_MOCK=true`; remove it before going live.

Endpoints expected under `VITE_STATUS_API_URL`:

| Request                                    | Returns                                                              |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `GET /summary`                             | Current status of every service (shape below)                        |
| `GET /maintenance?from=YYYY-MM&to=YYYY-MM` | Array of events (or `{ items: [...] }`) starting in that month range |
| `GET /incidents?from=YYYY-MM&to=YYYY-MM`   | Same shape as maintenance                                            |

`/summary` shape:

```json
{
  "updatedAt": "2026-10-24T04:54:00Z",
  "groups": [
    {
      "id": "dashboard",
      "name": "Dashboard",
      "status": "operational",
      "defaultOpen": true,
      "services": [
        {
          "id": "dash",
          "name": "dash.industrialpmr.com",
          "status": "operational",
          "description": "Main dashboard",
          "uptime": 99.98,
          "history": [{ "date": "2026-10-24", "status": "operational" }],
          "responseTimes": [{ "t": 1761281000000, "v": 0.042 }]
        }
      ]
    }
  ]
}
```

- `status` is one of `operational`, `degraded`, `partial_outage`, `major_outage`, `maintenance`. Anything else is treated as `operational`.
- `history` (up to 90 daily entries, oldest first), `uptime` (percent) and `responseTimes` (`t` = epoch milliseconds or ISO date, `v` = seconds, about 24 hours) are optional. A service without `history` shows only its current status. The response chart appears when `responseTimes` has two or more points.
- Event shape for maintenance and incidents: `{ "id", "title", "status", "startsAt", "endsAt?", "description?" }`. Events are placed in the month of `startsAt`.
- The overall headline ("All services are online", "Some services are down", ...) is the worst status found across all groups and services. The status page refreshes every 60 seconds.

## 6. Editing content

| To change                               | Edit                                                   |
| --------------------------------------- | ------------------------------------------------------ |
| Feature groups, titles, row text, icons | `src/data/featureGroups.jsx`                           |
| Hero text, footer, call section, nav    | the matching file in `src/components/`                 |
| Terms, Privacy, Docs and API page text  | the `pages` object in `src/pages/InfoPage.jsx`         |
| Colours, fonts, spacing                 | CSS variables at the top of `src/styles.css`           |
| Page title, meta description, favicon   | the page's `.html` file                                |
| Images                                  | replace the files in `public/assets/` (keep the names) |

## 7. Deployment (Vercel)

1. Push the project to GitHub and import it in Vercel.
2. Framework preset: **Vite** (build `npm run build`, output `dist`).
3. Optional environment variable `LEAD_WEBHOOK_URL`: a URL (Slack, Zapier, Make, n8n, Apps Script) that receives each request as JSON. Without it, requests only appear in Vercel → Logs.

**Security headers.** `vercel.json` sends `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` (camera, microphone, geolocation, payment and USB off) and `Strict-Transport-Security` on every response. The Content-Security-Policy is sent as `Content-Security-Policy-Report-Only` first. After deploying, open each page with the browser console open; if no "Content Security Policy" messages appear, rename the key to `Content-Security-Policy` to enforce it. Only `self`, `data:` images and the Google Maps frame are allowed. Add any new third-party script, font or frame to the policy before using it.

## 8. Tests

`npm test` runs the suite with Vitest, jsdom and Testing Library.

| File                     | Covers                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `tests/lead.test.js`     | `isValidPhone` cases; `submitLead` request shape, server error, non-JSON error fallback                                      |
| `tests/api.test.js`      | 405, bad phone, letters/over-long numbers, honeypot, string body, webhook forward, timeout                                   |
| `tests/assets.test.jsx`  | Every `<img>`, the favicon and the font preload point at real files in `public/`                                             |
| `tests/address.test.jsx` | Address section and map iframe; footer has no address or phone links                                                         |
| `tests/app.test.jsx`     | Sections render; feature groups and rows; nav anchors; mobile menu; dialog; validation; submit                               |
| `tests/status.test.jsx`  | Status helpers and adapters, routing, status page, groups, errors, maintenance/incidents months and paging, footer indicator |
| `tests/pages.test.jsx`   | Standalone pages render their content; header and footer links; footer links on the landing page                             |

`tests/setup.js` stubs `showModal()`/`close()` and `IntersectionObserver`, which jsdom doesn't implement.

Not covered by automated tests: the scrolling ticker and hero animation (CSS only) and real browser layout.

## 9. Code quality

- `npm run lint` must pass with no errors (ESLint 9, React and React Hooks rules).
- `npm run format:check` must pass (Prettier, single quotes, 100 columns).
- `.gitignore` excludes `node_modules/`, `dist/`, `.vercel/` and `.env*` files (except `.env.example`).
