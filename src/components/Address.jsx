const MAP_QUERY = 'Amber Estate Building, Shahrah-e-Faisal, Karachi 75400, Pakistan';
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export default function Address() {
  return (
    <section className="address" id="address" aria-labelledby="address-title">
      <div className="wrap address__grid">
        <div className="address__info">
          <h2 id="address-title">Visit our office.</h2>
          <address>
            Office #203, Amber Estate Building<br />
            Block 7 &amp; 8, Shahrah-e-Faisal,<br />
            Kathiawar Society Block A, Bangalore Town,<br />
            Karachi 75400
          </address>
          <a className="address__link" href={MAP_LINK} target="_blank" rel="noopener">Open in Google Maps</a>
        </div>
        <div className="address__map">
          <iframe
            title="Map showing the industrialpmr office at Amber Estate Building, Shahrah-e-Faisal, Karachi"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
