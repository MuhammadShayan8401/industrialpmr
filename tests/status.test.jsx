import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatusApp, { currentPath } from '../src/status/StatusApp.jsx';
import PeriodView from '../src/status/views/PeriodView.jsx';
import App from '../src/App.jsx';
import { adaptEvents, adaptSummary } from '../src/status/adapters.js';
import { getSummary } from '../src/status/mockData.js';
import {
  normalizeStatus,
  overallHeadline,
  overallStatus,
  worstStatus,
} from '../src/status/statuses.js';
import { formatUptime, monthKey } from '../src/status/format.js';
import * as api from '../src/status/api.js';

describe('status helpers', () => {
  it('normalizes unknown values to operational', () => {
    expect(normalizeStatus('Partial Outage')).toBe('partial_outage');
    expect(normalizeStatus('major-outage')).toBe('major_outage');
    expect(normalizeStatus('???')).toBe('operational');
    expect(normalizeStatus(undefined)).toBe('operational');
  });

  it('picks the worst status', () => {
    expect(worstStatus(['operational', 'degraded', 'operational'])).toBe('degraded');
    expect(worstStatus(['degraded', 'major_outage', 'maintenance'])).toBe('major_outage');
    expect(worstStatus([])).toBe('operational');
  });

  it('derives the overall status from groups and services', () => {
    const summary = adaptSummary(getSummary());
    expect(overallStatus(summary)).toBe('operational');
    summary.groups[1].services[0].status = 'partial_outage';
    expect(overallStatus(summary)).toBe('partial_outage');
    expect(overallHeadline('partial_outage')).toMatch(/down/);
  });

  it('formats uptime', () => {
    expect(formatUptime(100)).toBe('100% uptime');
    expect(formatUptime(99.954)).toBe('99.95% uptime');
    expect(formatUptime(undefined)).toBeNull();
  });

  it('adapters accept both arrays and { items }', () => {
    const item = { id: 1, title: 'DB upgrade', startsAt: '2026-11-02T01:00:00Z' };
    expect(adaptEvents([item])).toHaveLength(1);
    expect(adaptEvents({ items: [item] })[0].id).toBe('1');
    expect(adaptEvents(undefined)).toEqual([]);
  });
});

describe('status routing', () => {
  it('maps paths to a tab and falls back to /status', () => {
    expect(currentPath('/status/')).toBe('/status');
    expect(currentPath('/status/maintenance')).toBe('/status/maintenance');
    expect(currentPath('/status/incidents/')).toBe('/status/incidents');
    expect(currentPath('/status/nope')).toBe('/status');
  });
});

describe('status page', () => {
  it('shows the overall status, last update and every group', async () => {
    render(<StatusApp pathname="/status" />);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'All services are online' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Last updated on/)).toBeInTheDocument();
    for (const name of ['Dashboard', 'Middleware Servers', 'Broker Servers']) {
      expect(screen.getByRole('button', { name: new RegExp(name) })).toBeInTheDocument();
    }
    expect(screen.getByText('dash.industrialpmr.com')).toBeInTheDocument();
    expect(screen.getAllByText('100% uptime')).toHaveLength(3);
    expect(document.querySelectorAll('.st-uptime__bar')).toHaveLength(270);
    expect(screen.getByText('Response times')).toBeInTheDocument();
  });

  it('collapses and expands a group', async () => {
    const user = userEvent.setup();
    render(<StatusApp pathname="/status" />);
    const broker = await screen.findByRole('button', { name: /Broker Servers/ });
    expect(broker).toHaveAttribute('aria-expanded', 'false');
    await user.click(broker);
    expect(broker).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Broker 01')).toBeVisible();
  });

  it('marks the current tab', () => {
    render(<StatusApp pathname="/status/maintenance" />);
    expect(screen.getByRole('link', { name: 'Maintenance' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: 'Status' })).not.toHaveAttribute('aria-current');
  });

  it('shows an error note when the API fails', async () => {
    vi.spyOn(api, 'fetchSummary').mockRejectedValue(new Error('down'));
    render(<StatusApp pathname="/status" />);
    expect(await screen.findByRole('alert')).toHaveTextContent(/isn't available right now/);
  });

  it('reflects an outage in the heading', async () => {
    const data = adaptSummary(getSummary());
    data.groups[0].services[0].status = 'major_outage';
    vi.spyOn(api, 'fetchSummary').mockResolvedValue(data);
    render(<StatusApp pathname="/status" />);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Major outage' })
    ).toBeInTheDocument();
  });
});

describe('maintenance and incidents', () => {
  const now = new Date(2026, 9, 24);

  it('lists three months, newest first, with empty messages (maintenance)', async () => {
    render(<PeriodView kind="maintenance" now={now} />);
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual(['December 2026', 'November 2026', 'October 2026']);
    expect(await screen.findAllByText('No maintenance scheduled')).toHaveLength(2);
    expect(screen.getByText('No maintenance')).toBeInTheDocument();
    expect(screen.getByText('Oct 2026 to Dec 2026')).toBeInTheDocument();
  });

  it('looks back for incidents and pages through months', async () => {
    const user = userEvent.setup();
    render(<PeriodView kind="incidents" now={now} />);
    expect(screen.getByText('Aug 2026 to Oct 2026')).toBeInTheDocument();
    expect(await screen.findAllByText('No incidents reported')).toHaveLength(3);
    await user.click(screen.getByRole('button', { name: 'Previous months' }));
    expect(screen.getByText('May 2026 to Jul 2026')).toBeInTheDocument();
  });

  it('puts an incident in the month it started', async () => {
    vi.spyOn(api, 'fetchEvents').mockResolvedValue([
      {
        id: 'a',
        title: 'MQTT broker restart',
        status: 'Resolved',
        startsAt: '2026-09-12T08:00:00',
      },
    ]);
    render(<PeriodView kind="incidents" now={now} />);
    const card = (await screen.findByText('MQTT broker restart')).closest('section');
    expect(within(card).getByRole('heading', { level: 2 })).toHaveTextContent('September 2026');
    expect(monthKey(new Date(2026, 8, 1))).toBe('2026-09');
  });
});

describe('footer status indicator', () => {
  it('links to /status and shows the live state', async () => {
    render(<App />);
    const link = document.querySelector('.footer .status');
    expect(link).toHaveAttribute('href', '/status');
    await waitFor(() => expect(link).toHaveTextContent('All systems operational'));
  });

  it('falls back to a plain link when status is unavailable', async () => {
    vi.spyOn(api, 'fetchSummary').mockRejectedValue(new Error('down'));
    render(<App />);
    const link = document.querySelector('.footer .status');
    await waitFor(() => expect(link).toHaveTextContent('System status'));
  });
});
