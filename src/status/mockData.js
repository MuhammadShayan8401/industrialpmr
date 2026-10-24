// Sample data used in development and tests (see api.js). Not shown in production
// unless VITE_STATUS_USE_MOCK=true.
function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function history(days = 90, now = new Date()) {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (days - 1 - i));
    return { date: d.toISOString().slice(0, 10), status: 'operational' };
  });
}

function responseTimes(now = new Date(), hours = 24, stepMinutes = 5) {
  const random = rng(7);
  const end = Math.floor(now.getTime() / (stepMinutes * 60000)) * stepMinutes * 60000;
  const count = (hours * 60) / stepMinutes;
  const spikeAt = Math.floor(count * 0.2);
  return Array.from({ length: count }, (_, i) => ({
    t: end - (count - 1 - i) * stepMinutes * 60000,
    v: i === spikeAt ? 0.31 : 0.032 + random() * 0.03,
  }));
}

export function getSummary(now = new Date()) {
  const bars = () => history(90, now);
  return {
    updatedAt: now.toISOString(),
    groups: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        status: 'operational',
        defaultOpen: true,
        services: [
          {
            id: 'dash',
            name: 'dash.industrialpmr.com',
            status: 'operational',
            description: 'Main dashboard',
            uptime: 100,
            history: bars(),
            responseTimes: responseTimes(now),
          },
          {
            id: 'site',
            name: 'industrialpmr.com',
            status: 'operational',
            description: 'Marketing site',
            uptime: 100,
            history: bars(),
          },
          {
            id: 'dash-v3',
            name: 'v3.dash.industrialpmr.com',
            status: 'operational',
            description: 'Dashboard v3',
            uptime: 100,
            history: bars(),
          },
        ],
      },
      {
        id: 'middleware',
        name: 'Middleware Servers',
        status: 'operational',
        defaultOpen: true,
        services: [
          { id: 'rest-01', name: 'REST Middleware 01', status: 'operational' },
          { id: 'mqtt-listener', name: 'ipmr MQTT Middleware Listener', status: 'operational' },
        ],
      },
      {
        id: 'broker',
        name: 'Broker Servers',
        status: 'operational',
        defaultOpen: false,
        services: [
          { id: 'broker-01', name: 'Broker 01', status: 'operational' },
          { id: 'broker-02', name: 'Broker 02', status: 'operational' },
        ],
      },
    ],
  };
}

// No maintenance and no incidents in the sample data.
export function getEvents() {
  return [];
}
