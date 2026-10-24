// Date and number formatting for the status pages.
const TZ_ABBREVIATIONS = { 'Asia/Karachi': 'PKT' };

export function timeZoneAbbreviation(date = new Date()) {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (TZ_ABBREVIATIONS[zone]) return TZ_ABBREVIATIONS[zone];
  const part = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .formatToParts(date)
    .find((p) => p.type === 'timeZoneName');
  return part ? part.value : '';
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// 9:54am, 6:23:05pm
export function formatTime(value, { seconds = false } = {}) {
  const text = new Date(value).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    ...(seconds ? { second: '2-digit' } : {}),
  });
  return text.replace(/\s?(AM|PM)$/, (_, m) => m.toLowerCase());
}

export function formatUpdated(value) {
  return `${formatDate(value)} at ${formatTime(value)} ${timeZoneAbbreviation(new Date(value))}`.trim();
}

export function formatUptime(percent) {
  if (percent == null || Number.isNaN(Number(percent))) return null;
  return `${Math.round(Number(percent) * 100) / 100}% uptime`;
}

// --- months ---------------------------------------------------------------
export const monthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const addMonths = (date, n) => new Date(date.getFullYear(), date.getMonth() + n, 1);
export const monthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
export const monthLabel = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
export const monthShort = (date) =>
  date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
