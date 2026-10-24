import { Fragment } from 'react';

const items = ['Realtime status', 'Power analytics', 'Automatic reports', 'Works offline'];
const COPIES = 4; // must stay even so the -50% marquee loop is seamless

export default function Band() {
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track">
        {Array.from({ length: COPIES }, (_, n) =>
          items.map((t, i) => {
            const isLast = n === COPIES - 1 && i === items.length - 1;
            return (
              <Fragment key={n + t}>
                <span>{t}</span>
                {/* the final bullet keeps its space (so the loop stays seamless) but is hidden */}
                <i style={isLast ? { visibility: 'hidden' } : undefined}></i>
              </Fragment>
            );
          })
        )}
      </div>
    </div>
  );
}
