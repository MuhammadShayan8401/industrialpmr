import { formatDate } from '../format.js';
import { STATUS_LABEL } from '../statuses.js';

// One thin bar per day (up to 90), coloured by that day's status.
export default function UptimeBar({ history }) {
  if (!history?.length) return null;
  return (
    <div className="st-uptime" role="img" aria-label={`Status for the last ${history.length} days`}>
      <div className="st-uptime__bars">
        {history.map((day) => (
          <span
            key={day.date}
            className={`st-uptime__bar st-bg--${day.status}`}
            title={`${formatDate(`${day.date}T12:00:00`)}: ${STATUS_LABEL[day.status]}`}
          />
        ))}
      </div>
      <div className="st-uptime__legend" aria-hidden="true">
        <span>{history.length} days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
