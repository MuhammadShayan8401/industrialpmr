import { featureGroups } from '../data/featureGroups.jsx';

function GroupIcon({ children }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="30"
      height="30"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {children}
    </svg>
  );
}

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="wrap features__grid">
        <div className="features__intro">
          <h2>Dive deep into the world of industrial IoT.</h2>
          <p>
            industrialpmr is a simple, intuitive, and powerful solution for monitoring, analyzing,
            and reporting your factory operations from anywhere.
          </p>
        </div>

        <div className="groups">
          {featureGroups.map((group) => (
            <section className="grp" key={group.title}>
              <h3 className="grp__t">
                <GroupIcon>{group.icon}</GroupIcon>
                {group.title}
              </h3>
              <ul className="rows">
                {group.rows.map((row) => (
                  <li className="row" key={row.title}>
                    <h3>{row.title}</h3>
                    <p>{row.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
