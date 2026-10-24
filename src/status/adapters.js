// ---------------------------------------------------------------------------
// The ONE place to change when the real APIs are connected.
//
// Each adapter receives the raw JSON from your API and must return the shape the
// UI expects (documented in docs/DOCUMENTATION.md, "Status pages"). If your API
// already returns that shape, nothing needs to change. Otherwise map the fields here.
// ---------------------------------------------------------------------------
import { normalizeStatus } from './statuses.js';

/**
 * @returns {{ updatedAt: string, groups: Array<{
 *   id: string, name: string, status: string, defaultOpen?: boolean,
 *   services: Array<{ id: string, name: string, status: string, description?: string,
 *     uptime?: number, history?: Array<{date: string, status: string}>,
 *     responseTimes?: Array<{t: number|string, v: number}> }> }> }}
 */
export function adaptSummary(raw) {
  return {
    updatedAt: raw?.updatedAt ?? new Date().toISOString(),
    groups: (raw?.groups ?? []).map((group) => ({
      id: String(group.id ?? group.name),
      name: group.name,
      status: normalizeStatus(group.status),
      defaultOpen: group.defaultOpen,
      services: (group.services ?? []).map((service) => ({
        id: String(service.id ?? service.name),
        name: service.name,
        status: normalizeStatus(service.status),
        description: service.description,
        uptime: service.uptime,
        history: (service.history ?? []).map((day) => ({
          date: day.date,
          status: normalizeStatus(day.status),
        })),
        responseTimes: service.responseTimes ?? [],
      })),
    })),
  };
}

/**
 * Maintenance windows and incidents share one shape.
 * @returns {Array<{ id: string, title: string, status: string, startsAt: string,
 *   endsAt?: string, description?: string }>}
 */
export function adaptEvents(raw) {
  const list = Array.isArray(raw) ? raw : (raw?.items ?? []);
  return list.map((item) => ({
    id: String(item.id ?? `${item.title}-${item.startsAt}`),
    title: item.title,
    status: item.status ?? '',
    startsAt: item.startsAt,
    endsAt: item.endsAt,
    description: item.description,
  }));
}
