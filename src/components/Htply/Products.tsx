const PRODUCTS = [
  {
    key: 'film',
    title: 'Film Faced Plywood',
    desc: 'Ván ép phủ phim cho formwork và các ứng dụng xây dựng cần bề mặt ổn định, chịu lực và tái sử dụng nhiều lần.',
    tags: ['Formwork', 'Construction'],
    img: '/images/v1.jpg',
  },
  {
    key: 'wiremesh',
    title: 'Anti-Slip Plywood — Wiremesh',
    desc: 'Bề mặt lưới dệt chống trượt, độ bám cao kể cả khi ướt/dính dầu. Phủ film Dynea dày tới 240g/m², lõi Acacia/Eucalyptus, keo WBP/Phenolic.',
    tags: ['Trailer Flooring', 'Scaffolding'],
    img: '/images/v2.jpg',
  },
  {
    key: 'hexaply',
    title: 'Anti-Slip Plywood — Hexaply',
    desc: 'Bề mặt hoa văn lục giác dập nổi chính xác, chống trượt hiệu quả kèm thẩm mỹ hiện đại cho sân khấu sự kiện và không gian công cộng.',
    tags: ['Event Stage', 'Public Space'],
    img: '/images/v1.jpg',
  },
  {
    key: 'raw',
    title: 'Raw Plywood',
    desc: 'Ván ép nguyên bản cho sản xuất nội thất và đóng gói công nghiệp. Gỗ Acacia/Magnolia/Eucalyptus, ván lạng Okoumé/Bintangor/Pine/Poplar, đạt FSC, phát thải formaldehyde thấp E0/E0.5.',
    tags: ['Furniture', 'Packaging'],
    img: '/images/v2.jpg',
  },
  {
    key: 'lvl',
    title: 'LVL',
    desc: 'Khả năng chịu tải cao, chống thấm/chống cong vênh, chiều dài linh hoạt, thân thiện môi trường. Dùng cho dầm/vì kèo xây dựng, nội thất, pallet & thùng đóng gói công nghiệp.',
    tags: ['Structural', 'Construction'],
    img: '/images/v1.jpg',
  },
  {
    key: 'marine',
    title: 'Marine Plywood',
    desc: 'Product category demo. Thông số chịu ẩm/chịu nước cần xác nhận chính thức với HTPLY.',
    tags: ['Marine', 'Outdoor'],
    img: '/images/v2.jpg',
  },
  {
    key: 'melamine',
    title: 'Melamine Plywood',
    desc: 'Product category demo. Bề mặt phủ melamine, nội dung ứng dụng cần xác nhận trước khi public.',
    tags: ['Furniture', 'Interior'],
    img: '/images/v1.jpg',
  },
  {
    key: 'blockboard',
    title: 'Block Board',
    desc: 'Product category demo. Cấu tạo lõi gỗ cần xác nhận chính thức trước khi đưa lên website.',
    tags: ['Furniture', 'Doors'],
    img: '/images/v2.jpg',
  },
]

export function Products() {
  return (
    <section id="products">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">02 · Sản phẩm</div>
            <h2>Được phát triển để đáp ứng hiệu suất sử dụng.</h2>
          </div>
        </div>

        <div className="p3-grid reveal">
          {PRODUCTS.map((p) => (
            <article className="p3-card" key={p.key}>
              <div className="p3-visual">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="p3-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="p3-tags">
                  {p.tags.map((tag) => (
                    <span className="p3-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
