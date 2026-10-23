
const items = [
  'Realtime status',
  'Power analytics',
  'Automatic reports',
  'Works offline',
];

export default function Band() {
  return (
    <div className="band" aria-label="IndustrialPMR capabilities">
      <div className="band__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="band__group" key={copy}>
            {items.map((item, index) => (
              <span className="band__item" key={item}>
                <span>{item}</span>
                <i className={index % 2 === 0 ? 'band__lamp band__lamp--on' : 'band__lamp'} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
