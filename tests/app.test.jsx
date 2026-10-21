import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';
import { featureGroups } from '../src/data/featureGroups.jsx';

describe('page content', () => {
  it('renders the main sections', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Every machine/);
    expect(screen.getByRole('heading', { name: /Dive deep into the world of industrial IoT/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Call us about your factory/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Let's get your factory connected/ })).toBeInTheDocument();
  });

  it('renders every feature group and row', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('.grp')).toHaveLength(featureGroups.length);
    const rowCount = featureGroups.reduce((n, g) => n + g.rows.length, 0);
    expect(container.querySelectorAll('.row')).toHaveLength(rowCount);
    expect(featureGroups.map((g) => g.title)).toEqual(['Live monitoring', 'Power', 'Production and inventory', 'Reports and cost']);
  });

  it('keeps nav anchors pointing at existing ids', () => {
    const { container } = render(<App />);
    for (const a of container.querySelectorAll('.nav a, .skip')) {
      const id = a.getAttribute('href').slice(1);
      expect(container.querySelector('#' + id)).not.toBeNull();
    }
  });
});

describe('mobile menu', () => {
  it('toggles and closes when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    const burger = screen.getByRole('button', { name: 'Menu' });
    const menu = document.getElementById('mobile-menu');
    expect(menu).toHaveAttribute('hidden');
    await user.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true');
    expect(menu).not.toHaveAttribute('hidden');
    await user.click(within(menu).getByRole('link', { name: 'Features' }));
    expect(menu).toHaveAttribute('hidden');
  });
});

describe('request a call dialog', () => {
  const modal = () => document.getElementById('call-modal');

  it('opens from every "Request a call" trigger and closes on Cancel', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(modal()).not.toHaveAttribute('open');
    await user.click(screen.getAllByRole('button', { name: 'Request a call' })[0]);
    expect(modal()).toHaveAttribute('open');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(modal()).not.toHaveAttribute('open');
  });

  it('shows an error for a too-short number and does not call the API', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    render(<App />);
    await user.click(screen.getAllByRole('button', { name: 'Request a call' })[0]);
    await user.type(screen.getByLabelText(/Your contact number/), '12');
    await user.click(screen.getByRole('button', { name: 'Request call' }));
    expect(screen.getByRole('status')).toHaveTextContent('Enter a valid contact number.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits a valid number, shows success and resets the form', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    render(<App />);
    await user.click(screen.getAllByRole('button', { name: 'Request a call' })[0]);
    const input = screen.getByLabelText(/Your contact number/);
    await user.type(input, '+92 300 1234567');
    await user.click(screen.getByRole('button', { name: 'Request call' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/Request sent/));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).phone).toBe('+92 300 1234567');
    expect(input).toHaveValue('');
    expect(screen.getByRole('status')).toHaveClass('ok');
  });

  it('shows the server error when the request fails', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, json: async () => ({ error: 'Server said no' }) });
    render(<App />);
    await user.click(screen.getAllByRole('button', { name: 'Request a call' })[0]);
    await user.type(screen.getByLabelText(/Your contact number/), '+92 300 1234567');
    await user.click(screen.getByRole('button', { name: 'Request call' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Server said no'));
    expect(screen.getByRole('status')).toHaveClass('err');
    expect(screen.getByRole('button', { name: 'Request call' })).toBeEnabled();
  });
});
