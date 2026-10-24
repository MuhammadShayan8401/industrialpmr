export const SUPPORT_PHONE = '+92 21 34320800';
const MIN_PHONE_DIGITS = 7;

/** True when the string contains enough digits to be a phone number. */
const PHONE_CHARS = /^[+\d\s()-]{1,40}$/; // keep in sync with api/lead.js

export function isValidPhone(phone) {
  const value = String(phone || '').trim();
  return PHONE_CHARS.test(value) && value.replace(/\D/g, '').length >= MIN_PHONE_DIGITS;
}

/**
 * POSTs a "request a call" lead to the serverless function.
 * `website` is the honeypot field; real users leave it empty.
 * Throws an Error with a user-facing message on failure.
 */
export async function submitLead({ phone, website }) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'call', phone, website }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.error || `Could not send your request. Please call ${SUPPORT_PHONE}.`);
  }
}
