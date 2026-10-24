const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.874155085716!2d67.08099507607494!3d24.86814734494872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f8b3c788dcd%3A0xde8bbdfdbf182979!2sKunjiSoft%20Technologies.!5e0!3m2!1sen!2s!4v1792738489828!5m2!1sen!2s';
const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=KunjiSoft%20Technologies%20Karachi';

export default function Address() {
  return (
    <section className="address" id="address" aria-labelledby="address-title">
      <div className="wrap address__grid">
        <div className="address__info">
          <h2 id="address-title">Visit our office.</h2>
          <address>
            Office #304, Amber Estate Extension,
            <br />
            Block 7 &amp; 8, Shahrah-e-Faisal,
            <br />
            Kathiawar Society Block A, Bangalore Town,
            <br />
            Karachi 75400
          </address>
          <a className="address__link" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </div>
        <div className="address__map">
          <iframe
            title="Map showing the industrialpmr office at Amber Estate Extension, Shahrah-e-Faisal, Karachi"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
