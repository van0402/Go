const PRODUCTS = [
  {
    key: 'film',
    title: 'Film Faced Plywood',
    desc: 'Ván ép phủ phim cho formwork và các ứng dụng xây dựng cần bề mặt ổn định.',
    tags: ['Formwork', 'Construction'],
    img: '/images/v1.jpg',
  },
  {
    key: 'anti',
    title: 'Anti-Slip Plywood',
    desc: 'Bề mặt chống trượt cho trailer, sàn công nghiệp và ứng dụng cần độ bám cao.',
    tags: ['Trailer', 'Flooring'],
    img: '/images/v2.jpg',
  },
  {
    key: 'raw',
    title: 'Raw Plywood',
    desc: 'Product category demo. Thông số và cấu tạo cần xác nhận chính thức với HTPLY trước khi public.',
    tags: ['Furniture', 'Industrial'],
    img: '/images/v1.jpg',
  },
  {
    key: 'lvl',
    title: 'LVL',
    desc: 'Product category demo. Nội dung kỹ thuật và ứng dụng cần xác nhận trước khi đưa lên website.',
    tags: ['Structural', 'Packaging'],
    img: '/images/v2.jpg',
  },
  {
    key: 'marine',
    title: 'Marine Plywood',
    desc: 'Product category demo. Thông số chịu ẩm/chịu nước cần xác nhận chính thức với HTPLY.',
    tags: ['Marine', 'Outdoor'],
    img: '/images/v1.jpg',
  },
  {
    key: 'melamine',
    title: 'Melamine Plywood',
    desc: 'Product category demo. Bề mặt phủ melamine, nội dung ứng dụng cần xác nhận trước khi public.',
    tags: ['Furniture', 'Interior'],
    img: '/images/v2.jpg',
  },
  {
    key: 'blockboard',
    title: 'Block Board',
    desc: 'Product category demo. Cấu tạo lõi gỗ cần xác nhận chính thức trước khi đưa lên website.',
    tags: ['Furniture', 'Doors'],
    img: '/images/v1.jpg',
  },
  {
    key: 'packing',
    title: 'Packing Plywood',
    desc: 'Product category demo. Quy cách đóng gói/xuất khẩu cần xác nhận trước khi public.',
    tags: ['Packaging', 'Export'],
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
