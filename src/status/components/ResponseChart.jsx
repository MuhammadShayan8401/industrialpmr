import { useState } from 'react';
import { formatDate, formatTime, timeZoneAbbreviation } from '../format.js';

const W = 620;
const H = 150;
const PAD = { left: 46, right: 8, top: 10, bottom: 24 };
const HOUR = 3600 * 1000;

const seconds = (v) => (v === 0 ? '0.0 s' : `${v.toFixed(2)} s`);

// Line chart of response times. points: [{ t: ms epoch (or date string), v: seconds }]
export default function ResponseChart({ points }) {
  const [hover, setHover] = useState(null);
  const data = (points ?? [])
    .map((p) => ({ t: new Date(p.t).getTime(), v: Number(p.v) }))
    .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v));
  if (data.length < 2) return null;

  const tMin = data[0].t;
  const tMax = data[data.length - 1].t;
  const vMax = Math.max(0.1, Math.ceil(Math.max(...data.map((p) => p.v)) * 10) / 10);
  const x = (t) => PAD.left + ((t - tMin) / (tMax - tMin)) * (W - PAD.left - PAD.right);
  const y = (v) => H - PAD.bottom - (v / vMax) * (H - PAD.top - PAD.bottom);
  const path = data
    .map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)}`)
    .join(' ');

  const yTicks = [0, 1, 2, 3, 4].map((i) => (vMax / 4) * i);
  // Labels on every local 4-hour mark (12:00am, 4:00am, ...).
  const localTicks = [];
  const first = new Date(tMin);
  first.setMinutes(0, 0, 0);
  for (let t = first.getTime(); t <= tMax; t += HOUR) {
    if (t >= tMin && new Date(t).getHours() % 4 === 0) localTicks.push(t);
  }

  function onMove(event) {
    const box = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - box.left) / box.width) * W;
    const t = tMin + ((px - PAD.left) / (W - PAD.left - PAD.right)) * (tMax - tMin);
    let best = 0;
    for (let i = 1; i < data.length; i += 1) {
      if (Math.abs(data[i].t - t) < Math.abs(data[best].t - t)) best = i;
    }
    setHover(best);
  }

  const active = hover == null ? null : data[hover];
  const leftPercent = active ? (x(active.t) / W) * 100 : 0;

  return (
    <div className="st-chart">
      <p className="st-chart__title">Response times</p>
      <div className="st-chart__plot">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label="Response times over the last 24 hours"
        >
          {yTicks.map((v) => (
            <g key={v}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(v)}
                y2={y(v)}
                className="st-chart__grid"
              />
              <text x={PAD.left - 8} y={y(v) + 3} textAnchor="end" className="st-chart__tick">
                {seconds(v)}
              </text>
            </g>
          ))}
          {localTicks.map((t) => (
            <text key={t} x={x(t)} y={H - 6} textAnchor="middle" className="st-chart__tick">
              {formatTime(t)}
            </text>
          ))}
          <path d={path} className="st-chart__line" />
          {active && (
            <g>
              <line
                x1={x(active.t)}
                x2={x(active.t)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                className="st-chart__cursor"
              />
              <circle cx={x(active.t)} cy={y(active.v)} r="3.5" className="st-chart__dot" />
            </g>
          )}
        </svg>
        {active && (
          <div
            className="st-chart__tip"
            style={{ left: `${Math.min(Math.max(leftPercent, 18), 82)}%` }}
            role="status"
          >
            <p>
              <strong>
                {formatTime(active.t, { seconds: true })} {timeZoneAbbreviation(new Date(active.t))}
              </strong>
              <span> · {formatDate(active.t)}</span>
            </p>
            <p>
              <i className="st-chart__swatch" /> Response time <b>{active.v.toFixed(3)} s</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
