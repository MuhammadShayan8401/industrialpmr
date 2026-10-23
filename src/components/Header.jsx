export default function Header({ menuOpen, setMenuOpen, openCall }) {
  return (
    <header className="header" id="top">
      <div className="header__inner">
        <a className="brand" href="#top" aria-label="industrialpmr home">
          <img src="/assets/logo-full.png" alt="industrialpmr – Industrial Production Monitoring & Reporting" height="36" width="186" />
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header__actions">
          <a href="https://dash.industrialpmr.com/" className="btn btn--ink btn--sm">Dashboard</a>
        </div>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        ><span></span><span></span></button>
      </div>
      <div
        className="mobile-menu"
        id="mobile-menu"
        hidden={!menuOpen}
        onClick={(e) => { if (e.target.tagName === 'A') setMenuOpen(false); }}
      >
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
        <button className="btn btn--accent" onClick={openCall}>Request a call</button>
      </div>
    </header>
  );
}
