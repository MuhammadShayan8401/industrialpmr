// Status vocabulary shared by every status component.
// Ordered from best to worst: the overall status is the worst one found.
export const STATUS_ORDER = [
  'operational',
  'maintenance',
  'degraded',
  'partial_outage',
  'major_outage',
];

export const STATUS_LABEL = {
  operational: 'Operational',
  maintenance: 'Under maintenance',
  degraded: 'Degraded performance',
  partial_outage: 'Partial outage',
  major_outage: 'Major outage',
};

const OVERALL_HEADLINE = {
  operational: 'All services are online',
  maintenance: 'Scheduled maintenance in progress',
  degraded: 'Some services are slow',
  partial_outage: 'Some services are down',
  major_outage: 'Major outage',
};

const OVERALL_SHORT = {
  operational: 'All systems operational',
  maintenance: 'Maintenance in progress',
  degraded: 'Degraded performance',
  partial_outage: 'Partial outage',
  major_outage: 'Major outage',
};

export function normalizeStatus(value) {
  const key = String(value ?? '')
    .toLowerCase()
    .replace(/[\s-]+/g, '_');
  return STATUS_ORDER.includes(key) ? key : 'operational';
}

export function worstStatus(list) {
  return list.reduce(
    (worst, s) => (STATUS_ORDER.indexOf(s) > STATUS_ORDER.indexOf(worst) ? s : worst),
    'operational'
  );
}

export function overallStatus(summary) {
  const all = (summary?.groups ?? []).flatMap((g) => [
    g.status,
    ...(g.services ?? []).map((s) => s.status),
  ]);
  return worstStatus(all.map(normalizeStatus));
}

export const overallHeadline = (status) => OVERALL_HEADLINE[status] ?? OVERALL_HEADLINE.operational;
export const overallShort = (status) => OVERALL_SHORT[status] ?? OVERALL_SHORT.operational;
