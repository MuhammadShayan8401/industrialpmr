import { useState } from 'react';
import { isValidPhone, submitLead } from '../lib/lead.js';

const CLOSE_DELAY_MS = 1800;

/** Form state + submit handler for the "Request a call" dialog. */
export default function useLeadForm(onDone) {
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(true);
  const [sending, setSending] = useState(false);

  function setStatus(text, success) {
    setMessage(text);
    setOk(success);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = (data.get('phone') || '').toString().trim();

    if (!isValidPhone(phone)) return setStatus('Enter a valid contact number.', false);

    setSending(true);
    setStatus('Sending…', true);
    try {
      await submitLead({ phone, website: data.get('website') });
      setStatus('Request sent. A representative will call you shortly.', true);
      form.reset();
      setTimeout(() => {
        onDone();
        setMessage('');
      }, CLOSE_DELAY_MS);
    } catch (err) {
      setStatus(err.message, false);
    } finally {
      setSending(false);
    }
  }

  return { message, ok, sending, onSubmit };
}
