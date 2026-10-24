import { useState } from 'react';
import { useEvents } from '../useEvents.js';
import {
  addMonths,
  formatDate,
  formatTime,
  monthKey,
  monthLabel,
  monthShort,
  monthStart,
} from '../format.js';

const KINDS = {
  maintenance: {
    title: 'Maintenance',
    // Maintenance looks ahead: the window starts at the current month.
    initial: (now) => monthStart(now),
    empty: (month, now) =>
      month > monthStart(now) ? 'No maintenance scheduled' : 'No maintenance',
  },
  incidents: {
    title: 'Previous incidents',
    // Incidents look back: the window ends at the current month.
    initial: (now) => addMonths(monthStart(now), -2),
    empty: () => 'No incidents reported',
  },
};

function EventItem({ item }) {
  const start = new Date(item.startsAt);
  return (
    <li className="st-event">
      <div className="st-event__top">
        <strong>{item.title}</strong>
        {item.status && <span className="st-badge">{item.status}</span>}
      </div>
      <p className="st-event__time">
        {formatDate(start)} {formatTime(start)}
        {item.endsAt && ` to ${formatDate(item.endsAt)} ${formatTime(item.endsAt)}`}
      </p>
      {item.description && <p>{item.description}</p>}
    </li>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.6 8.3l2.3 2.3 4.5-4.7"
        fill="none"
        stroke="#111c24"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PeriodView({ kind, now = new Date() }) {
  const config = KINDS[kind];
  const [start, setStart] = useState(() => config.initial(now));
  const end = addMonths(start, 2);
  const { items, error, loading } = useEvents(kind, monthKey(start), monthKey(end));

  // Newest month first, like the status page this was modelled on.
  const months = [end, addMonths(start, 1), start];

  return (
    <>
      <header className="st-hero st-hero--plain">
        <h1>{config.title}</h1>
        <div className="st-pager">
          <button
            type="button"
            aria-label="Previous months"
            onClick={() => setStart(addMonths(start, -3))}
          >
            ‹
          </button>
          <span>
            {monthShort(start)} to {monthShort(end)}
          </span>
          <button
            type="button"
            aria-label="Next months"
            onClick={() => setStart(addMonths(start, 3))}
          >
            ›
          </button>
        </div>
      </header>

      {error && (
        <p className="st-note" role="alert">
          This information isn&apos;t available right now.
        </p>
      )}

      {months.map((month) => {
        const key = monthKey(month);
        const list = items.filter((item) => monthKey(new Date(item.startsAt)) === key);
        return (
          <section className="st-card st-month" key={key} aria-busy={loading}>
            <h2>{monthLabel(month)}</h2>
            {list.length ? (
              <ul className="st-events">
                {list.map((item) => (
                  <EventItem key={item.id} item={item} />
                ))}
              </ul>
            ) : (
              <p className="st-empty">
                <Check />
                {loading ? 'Loading…' : config.empty(month, now)}
              </p>
            )}
          </section>
        );
      })}
    </>
  );
}
