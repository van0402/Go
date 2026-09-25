const items = [
  { n: '01', label: 'Độ chính xác độ dày', note: 'Kiểm soát sai số', img: '/images/g1.jpg' },
  { n: '02', label: 'Kiểm soát độ ẩm', note: 'Duy trì mức ổn định', img: '/images/g2.jpg' },
  { n: '03', label: 'Độ bền liên kết', note: 'Kiểm tra độ bám dính', img: '/images/g3.jpg' },
  {
    n: '04',
    label: 'Độ chính xác kích thước',
    note: 'Kiểm tra kích thước & độ vuông',
    img: '/images/g4.jpg',
  },
  {
    n: '05',
    label: 'Chất lượng bề mặt',
    note: 'Kiểm tra độ phẳng & hoàn thiện',
    img: '/images/g5.jpg',
  },
]

export function QualityGrid() {
  return (
    <section id="quality">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">05 · Chất Lượng</div>
            <h2>Quality is measured. Not claimed.</h2>
          </div>
        </div>
        <div className="quality-grid reveal">
          {items.map((item) => (
            <div
              className="quality-item"
              key={item.n}
              style={{ backgroundImage: `url(${item.img})` }}
            >
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