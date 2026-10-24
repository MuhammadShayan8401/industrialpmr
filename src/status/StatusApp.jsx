import StatusView from './views/StatusView.jsx';
import PeriodView from './views/PeriodView.jsx';

// The three status pages share one HTML entry (status.html); the path picks the view.
const TABS = [
  { path: '/status', label: 'Status' },
  { path: '/status/maintenance', label: 'Maintenance' },
  { path: '/status/incidents', label: 'Previous incidents' },
];

export function currentPath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return TABS.some((t) => t.path === clean) ? clean : '/status';
}

export default function StatusApp({ pathname = window.location.pathname }) {
  const path = currentPath(pathname);

  return (
    <div className="st">
      <a className="skip" href="#status-main">
        Skip to content
      </a>
      <header className="st-top">
        <div className="st-top__inner">
          <a className="st-top__logo" href="/" aria-label="industrialpmr home">
            <img src="/assets/logo-full.svg" alt="industrialpmr" width="186" height="36" />
          </a>
          <nav className="st-tabs" aria-label="Status">
            {TABS.map((tab) => (
              <a
                key={tab.path}
                href={tab.path}
                aria-current={tab.path === path ? 'page' : undefined}
              >
                {tab.label}
              </a>
            ))}
          </nav>
          <a className="st-top__cta" href="/#contact">
            Get in touch
          </a>
        </div>
      </header>
      <main id="status-main" className="st-main">
        {path === '/status' && <StatusView />}
        {path === '/status/maintenance' && <PeriodView kind="maintenance" />}
        {path === '/status/incidents' && <PeriodView kind="incidents" />}
      </main>
      <footer className="st-foot">
        <div className="st-foot__inner">
          © 2026 industrialpmr. Industrial Production Monitoring &amp; Reporting, by KunjiSoft
          Technologies.
        </div>
      </footer>
    </div>
  );
}
