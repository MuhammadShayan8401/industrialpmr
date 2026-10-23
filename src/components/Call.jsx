export default function Call({ openCall }) {
  return (
    <section className="call" id="contact">
      <div className="wrap">
        <h2>Call us about your factory.</h2>
        <a className="call__num" href="tel:+922134320800">+92 21 34320900</a>
        <div className="call__foot">
          <p>Ask a question, or have a representative walk you through the system.</p>
          <button className="btn btn--ink" onClick={openCall}>Request a call</button>
        </div>
      </div>
    </section>
  );
}
