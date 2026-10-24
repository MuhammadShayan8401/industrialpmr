import { useState } from 'react';
import { formatUptime } from '../format.js';
import StatusBadge from './StatusBadge.jsx';
import StatusIcon from './StatusIcon.jsx';
import UptimeBar from './UptimeBar.jsx';
import ResponseChart from './ResponseChart.jsx';
import { STATUS_LABEL } from '../statuses.js';

function Chevron({ open }) {
  return (
    <svg
      className={`st-chevron${open ? ' is-open' : ''}`}
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Service({ service }) {
  const hasHistory = service.history?.length > 0;
  const uptime = formatUptime(service.uptime);

  // Services without a history simply show their current status on the right.
  if (!hasHistory) {
    return (
      <li className="st-service">
        <div className="st-service__row">
          <span className="st-service__name">
            <StatusIcon status={service.status} />
            {service.name}
          </span>
          <span className={`st-text st-text--${service.status}`}>
            {STATUS_LABEL[service.status]}
          </span>
        </div>
      </li>
    );
  }

  return (
    <li className="st-service">
      <div className="st-service__row">
        <span className="st-service__name">
          <StatusIcon status={service.status} />
          {service.name}
          {service.description && (
            <span className="st-info" title={service.description} aria-label={service.description}>
              i
            </span>
          )}
        </span>
        {uptime && <span className={`st-text st-text--${service.status}`}>{uptime}</span>}
      </div>
      <UptimeBar history={service.history} />
      {service.responseTimes?.length > 1 && <ResponseChart points={service.responseTimes} />}
    </li>
  );
}

export default function ServiceGroup({ group }) {
  const [open, setOpen] = useState(group.defaultOpen !== false);
  const panelId = `group-${group.id}`;

  return (
    <section className="st-group">
      <button
        type="button"
        className="st-group__head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span className="st-group__name">{group.name}</span>
        <span className="st-group__right">
          <StatusBadge status={group.status} />
          <Chevron open={open} />
        </span>
      </button>
      <ul id={panelId} className="st-group__body" hidden={!open}>
        {group.services.map((service) => (
          <Service key={service.id} service={service} />
        ))}
      </ul>
    </section>
  );
}
