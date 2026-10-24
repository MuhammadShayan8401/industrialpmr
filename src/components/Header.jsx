export default function Header({ menuOpen, setMenuOpen, base = '' }) {
  // `base` is '/' on the standalone pages so the anchors point back to the landing page.
  return (
    <header className="header" id="top">
      <div className="header__inner">
        <a className="brand" href={base || '#top'} aria-label="industrialpmr home">
          <img
            src="/assets/logo-full.svg"
            alt="industrialpmr – Industrial Production Monitoring & Reporting"
            height="36"
            width="186"
          />
        </a>
        <nav className="nav" aria-label="Primary">
          {base && <a href="/">Home</a>}
          <a href={`${base}#features`}>Features</a>
          <a href={`${base}#contact`}>Contact</a>
        </nav>
        <div className="header__actions">
          <a
            href="https://dash.industrialpmr.com/"
            className="btn btn--ink btn--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dashboard
          </a>
        </div>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <div
        className="mobile-menu"
        id="mobile-menu"
        hidden={!menuOpen}
        onClick={(e) => {
          if (e.target.tagName === 'A') setMenuOpen(false);
        }}
      >
        {base && <a href="/">Home</a>}
        <a href={`${base}#features`}>Features</a>
        <a href={`${base}#contact`}>Contact</a>
        <a className="btn btn--accent" href="tel:+922134320900">
          Call now
        </a>
      </div>
    </header>
  );
}
