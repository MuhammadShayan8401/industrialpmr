// Vercel serverless function: receives "Request a call" submissions.
// Optional env var (Vercel → Project → Settings → Environment Variables):
//   LEAD_WEBHOOK_URL – any webhook (Slack, Zapier, Make, n8n, Google Apps Script…) that receives the request as JSON
const PHONE_RE = /^[+\d\s()-]{7,40}$/;
const WEBHOOK_TIMEOUT_MS = 5000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const b = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently accept bots

  const lead = {
    type: 'call',
    phone: String(b.phone || '').trim(),
    receivedAt: new Date().toISOString(),
  };

  if (!PHONE_RE.test(lead.phone) || lead.phone.replace(/\D/g, '').length < 7) {
    return res.status(400).json({ error: 'Enter a valid contact number.' });
  }

  console.log('[lead]', JSON.stringify(lead)); // visible in Vercel → Logs

  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      const r = await fetch(process.env.LEAD_WEBHOOK_URL, {
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          Object.assign({ text: 'New industrialpmr call request: ' + lead.phone }, lead)
        ),
      });
      if (!r.ok) console.error('Webhook responded', r.status);
    } catch (e) {
      console.error('Webhook failed', e);
    }
  }

  return res.status(200).json({ ok: true });
}

function safeParse(s) {
  try {
    const v = JSON.parse(s);
    return v && typeof v === 'object' ? v : {};
  } catch {
    return {};
  }
}
