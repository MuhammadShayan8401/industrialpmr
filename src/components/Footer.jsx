export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">

        <div className="footer__top">
          <div className="footer__brand">
            <a className="flogo" href="#top" aria-label="industrialpmr home">
              <img src="/assets/logo-full.png" alt="industrialpmr" width="186" height="36" />
            </a>
            <h2>Let's get your factory connected.</h2>
            <p>Industrial Production Monitoring &amp; Reporting, by KunjiSoft Technologies.</p>
            <a className="status" href="https://status.industrialpmr.com/" target="_blank" rel="noopener">System status</a>
          </div>

          <div className="footer__contact">
            <h4>Address</h4>
            <p>
              Office #203, Amber Estate Building<br />
              Block 7 &amp; 8, Shahrah-e-Faisal,<br />
              Kathiawar Society Block A, Bangalore Town,<br />
              Karachi 75400
            </p>
          </div>

          <div className="footer__contact">
            <h4>Contact</h4>
            <p>
              <a href="tel:+923412636264">+92 341 2636264</a><br />
              <a href="tel:+922134320800">+92 21 34320800</a><br />
              <a href="tel:+922134320900">+92 21 34320900</a>
            </p>
            <p>
              <a href="mailto:info@kunjisoft.com">info@kunjisoft.com</a><br />
              <a href="mailto:sales@industrialpmr.com">sales@industrialpmr.com</a>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
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
            <a href="https://www.industrialpmr.com" target="_blank" rel="noopener">KunjiSoft Technologies</a>
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
