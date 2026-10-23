const items = ['Realtime status', 'Power analytics', 'Automatic reports', 'Works offline'];

export default function Band() {
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track">
        {[0, 1].map((n) =>
          items.map((t) => (
            <Fragment key={n + t}><span>{t}</span><i></i></Fragment>
          ))
        )}
      </div>
    </div>
  );
} 
