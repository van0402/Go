'use client'

import { useState } from 'react'
import './HtplyProduct.css'

const products = [
  {
    name: 'Commercial Plywood MR',
    code: 'HTP-C01',
    category: 'Commercial',
    image: '/images/sp1.jpg',
    thickness: '3–25 mm',
    core: 'Acacia',
    glue: 'MR',
    desc: 'Dòng plywood thương mại linh hoạt cho nội thất, gia công và các ứng dụng cần bề mặt ổn định.',
  },
  {
    name: 'Commercial Plywood Melamine',
    code: 'HTP-C02',
    category: 'Commercial',
    image: '/images/spp2.jpg',
    thickness: '6–25 mm',
    core: 'Acacia / Eucalyptus',
    glue: 'Melamine',
    desc: 'Phù hợp các đơn hàng yêu cầu khả năng chống ẩm tốt hơn và độ ổn định cao hơn trong sử dụng.',
  },
  {
    name: 'Hardwood Plywood',
    code: 'HTP-C03',
    category: 'Commercial',
    image: '/images/sp3.jpg',
    thickness: '6–25 mm',
    core: 'Hardwood',
    glue: 'MR / WBP',
    desc: 'Cấu trúc lõi cứng, phù hợp các ứng dụng cần độ ổn định và khả năng chịu tải tốt.',
  },
  {
    name: 'Eucalyptus Plywood',
    code: 'HTP-C04',
    category: 'Commercial',
    image: '/images/sp4.jpg',
    thickness: '6–25 mm',
    core: 'Eucalyptus',
    glue: 'MR / Melamine',
    desc: 'Dòng plywood lõi bạch đàn với độ cứng tốt và khả năng gia công ổn định.',
  },
  {
    name: 'Film Faced Plywood Brown',
    code: 'HTP-F01',
    category: 'Construction',
    image: '/images/sp5.jpg',
    thickness: '9–21 mm',
    core: 'Acacia / Eucalyptus',
    glue: 'WBP',
    desc: 'Dòng phủ phim dành cho cốp pha và các ứng dụng thi công cần khả năng tái sử dụng.',
  },
  {
    name: 'Film Faced Plywood Black',
    code: 'HTP-F02',
    category: 'Construction',
    image: '/images/sp6.jpg',
    thickness: '9–21 mm',
    core: 'Hardwood',
    glue: 'WBP',
    desc: 'Bề mặt phủ phim đen, phù hợp môi trường thi công và các dự án yêu cầu độ bền cao.',
  },
  {
    name: 'Anti-Slip Plywood',
    code: 'HTP-F03',
    category: 'Construction',
    image: '/images/sp7.jpg',
    thickness: '12–21 mm',
    core: 'Hardwood',
    glue: 'WBP',
    desc: 'Bề mặt chống trượt cho sàn công nghiệp, phương tiện và các ứng dụng cần độ bám.',
  },
  {
    name: 'Structural Plywood',
    code: 'HTP-F04',
    category: 'Construction',
    image: '/images/sp8.jpg',
    thickness: '9–25 mm',
    core: 'Hardwood',
    glue: 'WBP',
    desc: 'Plywood kết cấu hướng tới các ứng dụng cần độ cứng và độ ổn định cao.',
  },
  {
    name: 'Packing Plywood Standard',
    code: 'HTP-P01',
    category: 'Packaging',
    image: '/images/sp9.jpg',
    thickness: '3–18 mm',
    core: 'Mixed',
    glue: 'MR',
    desc: 'Giải pháp đóng gói công nghiệp cho thùng, kiện và hàng xuất khẩu.',
  }
]

export function HtplyProduct() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = products[activeIndex]

  return (
    <main className="htply-products-page">

        <header className="site-header">
  <div className="container header-inner">
    <a className="brand" href="/">
      <span className="brand-mark">HTP</span>
      <span className="brand-text">HTPLY VIETNAM</span>
    </a>

    <nav className={`nav${menuOpen ? ' mobile-open' : ''}`}>
      <a href="/">Home</a>

      <a href="/about">
        About
      </a>

      <a className="active" href="/products">
        Products
      </a>

      <a href="/#factory">
        Factory
      </a>

      <a href="/#quality">
        Quality
      </a>

      <a href="/#markets">
        Markets
      </a>
    </nav>

    <div className="header-actions">
      <a className="quote-btn" href="/#quote">
        Request a Quote
      </a>

      <a className="arrow-btn" href="/#quote">
        ↗
      </a>
    </div>

    <button
      className="menu-toggle"
      onClick={() => setMenuOpen((v) => !v)}
      aria-label="Toggle navigation"
    >
      ☰
    </button>
  </div>
</header>

      <section className="product-hero">
        <div className="products-container product-hero-content">

          <h1>
            Ổn định từ cấu trúc đến chất lượng.
          </h1>

        </div>
      </section>

      <section className="product-index-section">

        <div className="products-container">

          <div className="product-section-head">

            <div>
              <div className="product-section-kicker">
                01 · Product Catalogue
              </div>

              <h2>
                Product index for fast B2B browsing.
              </h2>
            </div>
          </div>

          <div className="product-index-layout">

            <div className="product-list">

              {products.map((product, index) => (

                <button
                  type="button"
                  key={product.code}
                  className={`product-row ${
                    activeIndex === index ? 'active' : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >

                  <span className="product-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="product-row-main">

                    <span className="product-row-title">
                      {product.name}
                    </span>

                    <span className="product-row-tag">
                      {product.category}
                    </span>

                  </span>

                  <span className="product-row-arrow">
                    ↗
                  </span>

                </button>

              ))}

            </div>

            <div className="product-preview-wrap">

              <article className="product-preview-card">

                <div className="product-preview-media">

                  <span className="product-preview-badge">
                    {active.category}
                  </span>

                  <img
                    src={active.image}
                    alt={active.name}
                  />

                </div>

                <div className="product-preview-body">

                  <div className="product-preview-title-row">

                    <h3>{active.name}</h3>

                    <span className="product-preview-code">
                      {active.code}
                    </span>

                  </div>

                  <p className="product-preview-desc">
                    {active.desc}
                  </p>

                  <div className="product-preview-specs">

                    <div className="product-spec">
                      <small>Thickness</small>
                      <strong>{active.thickness}</strong>
                    </div>

                    <div className="product-spec">
                      <small>Core</small>
                      <strong>{active.core}</strong>
                    </div>

                    <div className="product-spec">
                      <small>Glue</small>
                      <strong>{active.glue}</strong>
                    </div>

                  </div>

                  <a href="#" className="product-preview-link">

                    <span>
                      View product details
                    </span>

                    <span>
                      ↗
                    </span>

                  </a>

                </div>

              </article>

            </div>

          </div>

          <div className="product-cta-band">

            <div>
              <h3>
                Need a project-specific configuration?
              </h3>

              <p>
                HTPLY có thể xử lý thickness, core, glue,
                face/back và packing theo yêu cầu riêng
                của từng thị trường hoặc đơn hàng OEM.
              </p>
            </div>

            <a href="#">
              Request Custom Quote ↗
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}