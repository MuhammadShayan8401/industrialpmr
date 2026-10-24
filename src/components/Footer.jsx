import { useSummary } from '../status/useSummary.js';
import { overallShort, overallStatus } from '../status/statuses.js';

export default function Footer({ home = '#top' }) {
  const { data } = useSummary();
  const overall = data ? overallStatus(data) : null;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="flogo" href={home} aria-label="industrialpmr home">
              <img src="/assets/logo-full.svg" alt="industrialpmr" width="186" height="36" />
            </a>
            <h2>Let&apos;s get your factory connected.</h2>
            <p>Industrial Production Monitoring &amp; Reporting, by KunjiSoft Technologies.</p>
            <a className="status" href="/status">
              {overall ? (
                <>
                  <span className={`status__dot status__dot--${overall}`} aria-hidden="true" />
                  {overallShort(overall)}
                </>
              ) : (
                'System status'
              )}
            </a>
          </div>

          <div className="footer__links">
            <h4>Support</h4>
            <a href="/docs">Documentation</a>
            <a href="/api-status">API Status</a>
          </div>

          <div className="footer__links">
            <h4>Legal</h4>
            <a href="/terms">Terms &amp; conditions</a>
            <a href="/privacy">Privacy policy</a>
          </div>

          <div className="footer__powered">
            <h4>Powered by</h4>
            <a href="https://kunjisoft.com" target="_blank" rel="noopener noreferrer">
              KunjiSoft Technologies
            </a>
            <a href="mailto:info@kunjisoft.com">info@kunjisoft.com</a>
          </div>
        </div>

        <div className="footer__legal">
          © 2026 industrialpmr. All rights reserved. Designed and developed by KunjiSoft
          Technologies.
        </div>
      </div>
    </footer>
  );
}
