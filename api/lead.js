// Vercel serverless function: receives "Request a call" submissions.
// Optional env var (Vercel → Project → Settings → Environment Variables):
//   LEAD_WEBHOOK_URL – any webhook (Slack, Zapier, Make, n8n, Google Apps Script…) that receives the request as JSON
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var b = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently accept bots

  var lead = {
    type: 'call',
    phone: String(b.phone || '').trim().slice(0, 40),
    receivedAt: new Date().toISOString()
  };

  if (lead.phone.replace(/\D/g, '').length < 7) {
    return res.status(400).json({ error: 'Enter a valid contact number.' });
  }

  console.log('[lead]', JSON.stringify(lead)); // visible in Vercel → Logs

  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      var r = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({ text: 'New industrialpmr call request: ' + lead.phone }, lead))
      });
      if (!r.ok) console.error('Webhook responded', r.status);
    } catch (e) {
      console.error('Webhook failed', e);
    }
  }

  return res.status(200).json({ ok: true });
}

function safeParse(s) { try { return JSON.parse(s); } catch (e) { return {}; } }
