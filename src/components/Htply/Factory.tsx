const stats = [
  { value: '5,000 m²', label: 'Diện tích nhà xưởng' },
  { value: '60', label: 'Container / tháng (sản xuất)' },
  { value: '80', label: 'Container / tháng (cung ứng)' },
  { value: '30 ngày', label: 'Thời gian giao hàng trung bình' },
]

export function Factory() {
  return (
    <section id="factory">
      <div className="container reveal">
        <div className="factory">
          <div className="factory-content">
            <div className="section-kicker" style={{ color: '#E7CFBC' }}>
              06 · Nhà Xưởng &amp; Năng Lực
            </div>
            <h2>Sẵn sàng đáp ứng quy mô lớn.</h2>
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