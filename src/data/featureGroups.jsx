/* Content for the Features section. Edit text here; icons are the inline SVG shapes. */

export const featureGroups = [
  {
    title: "Live monitoring",
    icon: (
      <>
        <g fill="currentColor" stroke="none" opacity=".2" transform="translate(3 3)"><rect x="2" y="3" width="22" height="16" rx="1"/></g><rect x="2" y="3" width="22" height="16" rx="1"/><path d="M6 12h4l2-4 3 8 2-4h3"/>
      </>
    ),
    rows: [
      { title: "Real-time status", text: "Monitor the real-time status of machines, equipment, operators, and supervisors. Track machine operating states, production activity, and device connectivity from a centralized dashboard." },
      { title: "Offline capable", text: "No internet? No problem. The monitoring unit continues recording and storing activities while offline, allowing data to be retained until the internet connection is restored." },
      { title: "Department-wise monitoring", text: "View consolidated production statistics for each department, including total shots, pieces produced, electricity consumption, material usage, machine status, and supervisor assignments. Compare departmental performance and identify top-performing machines." },
    ],
  },
  {
    title: "Power",
    icon: (
      <>
        <g fill="currentColor" stroke="none" opacity=".2" transform="translate(3 3)"><path d="M17 2 6 17h8l-2 11 12-16h-8z"/></g><path d="M17 2 6 17h8l-2 11 12-16h-8z"/>
      </>
    ),
    rows: [
      { title: "Factory electricity up/down reports", text: "Get detailed reports on factory electricity availability and power status to monitor interruptions and understand their impact on production operations." },
      { title: "Power analytics and quality monitoring", text: "Monitor three-phase voltage, current, active, apparent and reactive power, power factor, frequency, energy consumption, harmonic distortion, phase relationships, and voltage deviation to assess electrical performance and identify power quality issues." },
      { title: "Alert configuration", text: "Configure voltage, current, and power quality alert thresholds using predefined or custom profiles, with warning and critical severity levels and hysteresis settings." },
      { title: "Total harmonic distortion (THD)", text: "Monitor voltage and current harmonic distortion across individual phases, compare THD levels against defined thresholds, and identify potential power quality issues." },
    ],
  },
  {
    title: "Production and inventory",
    icon: (
      <>
        <g fill="currentColor" stroke="none" opacity=".2" transform="translate(3 3)"><path d="M15 2 3 8v12l12 6 12-6V8z"/></g><path d="M15 2 3 8v12l12 6 12-6V8zM3 8l12 6 12-6M15 14v12"/>
      </>
    ),
    rows: [
      { title: "Production target management", text: "Set and monitor production targets for individual machines, track output against planned quantities, and review completion progress, operating time, downtime, and schedule health. Import or assign SAP production orders to connect production planning with live shop-floor monitoring." },
      { title: "Inventory details", text: "Track production for each product, including material consumption, raw material types, and usage across factory operations. Access inventory records to review available quantities, consumed materials, and remaining stock." },
      { title: "Raw material & inventory management", text: "Manage registered materials through a centralized inventory dashboard. Monitor stock availability, consumption, remaining quantities, material distribution, and inventory updates. Identify negative stock balances and potential discrepancies requiring reconciliation." },
    ],
  },
  {
    title: "Reports",
    icon: (
      <>
        <g fill="currentColor" stroke="none" opacity=".2" transform="translate(3 3)"><path d="M6 2h12l6 6v20H6z"/></g><path d="M6 2h12l6 6v20H6zM18 2v6h6M10 16h10M10 21h10"/>
      </>
    ),
    rows: [
      { title: "Detailed reports", text: "Get detailed reports for each machine's production, power consumption, and efficiency, along with consolidated factory-wide production reports and department-level performance summaries." },
      { title: "Automatic reports", text: "Receive automatically generated daily and monthly factory reports by email to stay informed about production performance, machine activity, and operational trends." },
      { title: "Historical trends & performance analysis", text: "Review historical production and electrical data over selected periods to understand operational trends, compare performance, and support data-driven factory management." },
    ],
  },
];
