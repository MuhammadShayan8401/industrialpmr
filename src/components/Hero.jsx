export default function Hero() {
  return (
    <section className="hero">
      <svg
        className="hero__trace"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          pathLength="1"
          d="M0 430H170L194 336L250 356L292 250H520L546 410H640L672 304L722 336L786 196H1000L1024 372H1160L1192 262L1262 286L1324 176H1440"
        />
      </svg>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1>
            Every machine.
            <br />
            Every kilowatt.
            <br />
            Every shot.
          </h1>
          <p>
            Complete factory visibility in real time: monitor machine status, power usage, and production metrics from anywhere.
          </p>
          <a className="go" href="tel:+922134320900">
            <span className="go__icon" aria-hidden="true">
              <svg viewBox="0 0 50 50" width="50" height="50">
                <path
                  d="M14 36 36 14M17 14h19v19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
            <span className="go__label">Call now</span>
          </a>
        </div>
        <figure className="hero__shot">
          <img
            src="/assets/laptop.svg"
            alt="The industrialpmr dashboard on a laptop, showing factory status, production, electricity and material used, and live unit status."
            width="1200"
            height="683"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
