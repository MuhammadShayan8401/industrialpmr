import handler from '../api/lead.js';

function mockRes() {
  const res = { headers: {} };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  return res;
}

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
  delete process.env.LEAD_WEBHOOK_URL;
});

describe('api/lead', () => {
  it('rejects non-POST requests', async () => {
    const res = mockRes();
    await handler({ method: 'GET' }, res);
    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe('POST');
  });

  it('rejects an invalid phone number', async () => {
    const res = mockRes();
    await handler({ method: 'POST', body: { phone: '12' } }, res);
    expect(res.statusCode).toBe(400);
  });

  it('silently accepts honeypot submissions without forwarding them', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://example.test/hook';
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const res = mockRes();
    await handler({ method: 'POST', body: { phone: '1234567', website: 'spam' } }, res);
    expect(res.statusCode).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepts a valid lead, including a string body', async () => {
    const res = mockRes();
    await handler({ method: 'POST', body: JSON.stringify({ phone: ' 0300 1234567 ' }) }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('forwards the lead to the webhook when configured', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://example.test/hook';
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true });
    const res = mockRes();
    await handler({ method: 'POST', body: { phone: '0300 1234567' } }, res);
    expect(fetchMock).toHaveBeenCalledOnce();
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.phone).toBe('0300 1234567');
    expect(payload.text).toContain('0300 1234567');
    expect(res.statusCode).toBe(200);
  });

  it('still succeeds if the webhook fails', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://example.test/hook';
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('down'));
    const res = mockRes();
    await handler({ method: 'POST', body: { phone: '0300 1234567' } }, res);
    expect(res.statusCode).toBe(200);
  });
});
