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
        </div>
      </div>
    </section>
  )
}