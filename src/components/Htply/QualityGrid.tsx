const items = [
  { n: '01', label: 'Thickness', note: 'Controlled tolerance' },
  { n: '02', label: 'Moisture', note: 'Monitored level' },
  { n: '03', label: 'Bonding', note: 'Checked adhesion' },
  { n: '04', label: 'Dimension', note: 'Verified size' },
  { n: '05', label: 'Surface', note: 'Visual inspection' },
]

export function QualityGrid() {
  return (
    <section id="quality">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">05 · Quality Control</div>
            <h2>Quality is measured. Not claimed.</h2>
          </div>
        </div>
        <div className="quality-grid reveal">
          {items.map((item) => (
            <div className="quality-item" key={item.n}>
              <span>{item.n}</span>
              <b>{item.label}</b>
              <small>{item.note}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}