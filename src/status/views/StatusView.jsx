import { useSummary } from '../useSummary.js';
import { formatUpdated } from '../format.js';
import { overallHeadline, overallStatus } from '../statuses.js';
import ServiceGroup from '../components/ServiceGroup.jsx';
import StatusIcon from '../components/StatusIcon.jsx';

const REFRESH_MS = 60_000;

export default function StatusView() {
  const { data, error, loading } = useSummary(REFRESH_MS);

  if (loading) return <p className="st-note">Loading status…</p>;
  if (!data) {
    return (
      <p className="st-note" role="alert">
        Live status isn&apos;t available right now. Please try again in a few minutes, or{' '}
        <a href="mailto:info@kunjisoft.com">contact us</a>.
        {error && import.meta.env.DEV && <small> ({error.message})</small>}
      </p>
    );
  }

  const status = overallStatus(data);
  return (
    <>
      <header className="st-hero">
        <span className={`st-hero__icon st-icon--${status}`}>
          <StatusIcon status={status} size={26} />
        </span>
        <h1>{overallHeadline(status)}</h1>
        <p>Last updated on {formatUpdated(data.updatedAt)}</p>
      </header>
      <div className="st-card">
        {data.groups.map((group) => (
          <ServiceGroup key={group.id} group={group} />
        ))}
      </div>
    </>
  );
}
