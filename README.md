# industrialpmr

Marketing site for **industrialpmr**, Industrial Production Monitoring & Reporting by KunjiSoft Technologies. Built with React 19 and Vite 6, deployed on Vercel.

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
```

| Script                 | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run build`        | Production build into `dist/`           |
| `npm run preview`      | Serve the production build locally      |
| `npm test`             | Run the test suite once                 |
| `npm run lint`         | ESLint                                  |
| `npm run format`       | Format everything with Prettier         |
| `npm run format:check` | Check formatting without changing files |

## Pages

| Route                                                 | Source                                |
| ----------------------------------------------------- | ------------------------------------- |
| `/`                                                   | `index.html` → `src/main.jsx`         |
| `/docs`                                               | `docs.html` → `src/info.jsx`          |
| `/api-status`                                         | `api-status.html` → `src/info.jsx`    |
| `/terms`                                              | `terms.html` → `src/info.jsx`         |
| `/privacy`                                            | `privacy.html` → `src/info.jsx`       |
| `/status`, `/status/maintenance`, `/status/incidents` | `status.html` → `src/status/main.jsx` |

## Configuration

Copy `.env.example` to `.env` for local use. `LEAD_WEBHOOK_URL` is optional; see the documentation for details.

Full documentation: [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)
