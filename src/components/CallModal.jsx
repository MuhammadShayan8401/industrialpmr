import { forwardRef } from 'react';
import useLeadForm from '../hooks/useLeadForm.js';

const CallModal = forwardRef(function CallModal(_, modalRef) {
  const close = () => modalRef.current.close();
  const { message, ok, sending, onSubmit } = useLeadForm(close);

  return (
    <dialog
      className="modal"
      id="call-modal"
      aria-labelledby="call-title"
      ref={modalRef}
      onClick={(e) => { if (e.target === modalRef.current) close(); }}
    >
      <form method="dialog" className="modal__form" id="call-form" onSubmit={onSubmit}>
        <h3 id="call-title">Request a call</h3>
        <p className="modal__hint">Leave your number and a representative will call you back.</p>
        <label>Your contact number
          <input type="tel" name="phone" required inputMode="tel" autoComplete="tel" placeholder="+92 3XX XXXXXXX" />
        </label>
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="modal__actions">
          <button className="btn btn--accent" type="submit" disabled={sending}>Request call</button>
          <button className="btn btn--line" type="button" onClick={close}>Cancel</button>
        </div>
        <p className={'form__status ' + (message ? (ok ? 'ok' : 'err') : '')} role="status" aria-live="polite">{message}</p>
      </form>
    </dialog>
  );
});

export default CallModal;
