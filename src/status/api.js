// Status data access. Components only call these functions.
//
// Configure the real API with an environment variable (Vercel → Settings → Environment Variables):
//   VITE_STATUS_API_URL=https://api.example.com/status
// Endpoints expected under that URL:
//   GET /summary                           current status of every service
//   GET /maintenance?from=YYYY-MM&to=YYYY-MM
//   GET /incidents?from=YYYY-MM&to=YYYY-MM
// Remember to add the API origin to `connect-src` in vercel.json.
//
// Without VITE_STATUS_API_URL the built-in sample data is used in development and tests only.
// To preview the sample data on a deployed site set VITE_STATUS_USE_MOCK=true.
import { adaptEvents, adaptSummary } from './adapters.js';

const BASE = (import.meta.env.VITE_STATUS_API_URL ?? '').replace(/\/$/, '');
const USE_MOCK =
  import.meta.env.DEV ||
  import.meta.env.MODE === 'test' ||
  import.meta.env.VITE_STATUS_USE_MOCK === 'true';

async function get(path) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Status API responded ${response.status}`);
  return response.json();
}

export const isConfigured = () => Boolean(BASE) || USE_MOCK;

export async function fetchSummary() {
  if (BASE) return adaptSummary(await get('/summary'));
  if (USE_MOCK) return adaptSummary((await import('./mockData.js')).getSummary());
  throw new Error('Status API is not configured');
}

/** kind: 'maintenance' | 'incidents'; from/to are "YYYY-MM" (inclusive). */
export async function fetchEvents(kind, from, to) {
  if (BASE) return adaptEvents(await get(`/${kind}?from=${from}&to=${to}`));
  if (USE_MOCK) return adaptEvents((await import('./mockData.js')).getEvents(kind, from, to));
  throw new Error('Status API is not configured');
}
