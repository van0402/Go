const stats = [
  { value: '5,000 m²', label: 'Factory footprint' },
  { value: '60', label: 'Containers / month production' },
  { value: '80', label: 'Containers / month supply' },
  { value: '30 days', label: 'Average lead time' },
]

export function Factory() {
  return (
    <section>
      <div className="container reveal">
        <div className="factory">
          <div className="factory-content">
            <div className="section-kicker" style={{ color: '#E7CFBC' }}>
              06 · Factory &amp; Capacity
            </div>
            <h2>Built to deliver at scale.</h2>
            <div className="factory-stats">
              {stats.map((stat) => (
                <div className="factory-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="factory-gallery">
            <img src="/images/dd.jpg" alt="HTPLY material" />
            <img src="/images/l1.jpg" alt="HTPLY log cross-section" />
            <img src="/images/l2.jpg" alt="HTPLY timber stock" />
          </div>
        </div>
      </div>
    </section>
  )
}