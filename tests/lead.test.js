import { isValidPhone, submitLead } from '../src/lib/lead.js';

describe('isValidPhone', () => {
  it.each(['+92 21 34320800', '03412636264', '1234567'])('accepts %s', (v) => {
    expect(isValidPhone(v)).toBe(true);
  });
  it.each(['', '123', 'abc', '+-- --', null, undefined])('rejects %s', (v) => {
    expect(isValidPhone(v)).toBe(false);
  });
});

describe('submitLead', () => {
  it('POSTs the lead as JSON', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    await submitLead({ phone: '0300 1234567', website: '' });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/lead');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ type: 'call', phone: '0300 1234567', website: '' });
  });

  it('throws the server error message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, json: async () => ({ error: 'Nope' }) });
    await expect(submitLead({ phone: '1234567' })).rejects.toThrow('Nope');
  });

  it('falls back to a generic message when the body is not JSON', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, json: async () => { throw new Error('x'); } });
    await expect(submitLead({ phone: '1234567' })).rejects.toThrow(/Please call \+92 21 34320800/);
  });
});
