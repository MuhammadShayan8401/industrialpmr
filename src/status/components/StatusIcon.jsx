import { STATUS_LABEL } from '../statuses.js';

// Small round icon: check for operational, warning mark for anything else.
export default function StatusIcon({ status, size = 14 }) {
  return (
    <svg
      className={`st-icon st-icon--${status}`}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      role="img"
      aria-label={STATUS_LABEL[status]}
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      {status === 'operational' ? (
        <path
          d="M4.6 8.3l2.3 2.3 4.5-4.7"
          fill="none"
          stroke="#0e1018"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M8 4.2v4.4M8 11.2v.2"
          fill="none"
          stroke="#0e1018"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
