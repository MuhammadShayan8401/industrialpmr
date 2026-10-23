export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">

        <div className="footer__top">
          <div className="footer__brand">
            <a className="flogo" href="#top" aria-label="industrialpmr home">
              <img src="/assets/logo-full.svg" alt="industrialpmr" width="186" height="36" />
            </a>
            <h2>Let's get your factory connected.</h2>
            <p>Industrial Production Monitoring &amp; Reporting, by KunjiSoft Technologies.</p>
            <a className="status" href="https://status.industrialpmr.com/" target="_blank" rel="noopener">System status</a>
          </div>

          <div className="footer__links">
            <h4>Support</h4>
            <a href="https://industrialpmr.com/docs">Documentation</a>
            <a href="https://industrialpmr.com/api">API Status</a>
          </div>

          <div className="footer__links">
            <h4>Legal</h4>
            <a href="https://industrialpmr.com/terms">Terms &amp; conditions</a>
            <a href="https://industrialpmr.com/privacy">Privacy policy</a>
          </div>

          <div className="footer__powered">
            <h4>Powered by</h4>
            <a href="https://kunjisoft.com" target="_blank" rel="noopener">KunjiSoft Technologies</a>
            <a href="mailto:info@kunjisoft.com">info@kunjisoft.com</a>
          </div>
        </div>

        <div className="footer__legal">
          © 2026 industrialpmr. All rights reserved.
          Designed and developed by KunjiSoft Technologies.
        </div>

      </div>
    </footer>
  );
}
