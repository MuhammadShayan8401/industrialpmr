import { STATUS_LABEL } from '../statuses.js';
import StatusIcon from './StatusIcon.jsx';

export default function StatusBadge({ status }) {
  return (
    <span className="st-badge">
      <StatusIcon status={status} size={12} />
      {STATUS_LABEL[status]}
    </span>
  );
}
