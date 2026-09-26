'use client'

import { useState } from 'react'
import './HtplyProduct.css'

const products = [
  { name:'Commercial Plywood MR', code:'HTP-C01', category:'Commercial', image:'/images/products/p1.jpg', thickness:'3–25 mm', core:'Acacia', glue:'MR', desc:'Dòng plywood thương mại linh hoạt cho nội thất, gia công và các ứng dụng cần bề mặt ổn định.' },
  { name:'Commercial Plywood Melamine', code:'HTP-C02', category:'Commercial', image:'/images/products/p2.jpg', thickness:'6–25 mm', core:'Acacia / Eucalyptus', glue:'Melamine', desc:'Phù hợp đơn hàng yêu cầu khả năng chống ẩm và độ ổn định cao hơn.' },
  { name:'Film Faced Plywood Brown', code:'HTP-F01', category:'Construction', image:'/images/products/p3.jpg', thickness:'9–21 mm', core:'Hardwood', glue:'WBP', desc:'Dòng phủ phim dành cho cốp pha và các ứng dụng thi công.' },
  { name:'Packing Plywood Standard', code:'HTP-P01', category:'Packaging', image:'/images/products/p4.jpg', thickness:'3–18 mm', core:'Mixed', glue:'MR', desc:'Giải pháp đóng gói công nghiệp cho thùng, kiện và hàng xuất khẩu.' },
]

export function HtplyProduct() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = products[activeIndex]

  return (
    <main className="htply-products-page">
      <section className="product-index-section">
        <div className="products-container">
          <div className="product-section-head">
            <div>
              <div className="product-section-kicker">01 · PRODUCT CATALOGUE</div>
              <h2>Product index for fast B2B browsing.</h2>
            </div>
            <p>Hover vào từng sản phẩm để xem ảnh và thông số thay đổi ở panel bên phải.</p>
          </div>

          <div className="product-index-layout">
            <div className="product-list">
              {products.map((product, index) => (
                <button
                  type="button"
                  key={product.code}
                  className={`product-row ${activeIndex === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="product-num">{String(index + 1).padStart(2,'0')}</span>
                  <span className="product-row-main">
                    <span className="product-row-title">{product.name}</span>
                    <span className="product-row-tag">{product.category}</span>
                  </span>
                  <span className="product-row-arrow">↗</span>
                </button>
              ))}
            </div>

            <div className="product-preview-wrap">
              <article className="product-preview-card">
                <div className="product-preview-media">
                  <span className="product-preview-badge">{active.category}</span>
                  <img src={active.image} alt={active.name} />
                </div>

                <div className="product-preview-body">
                  <div className="product-preview-title-row">
                    <h3>{active.name}</h3>
                    <span className="product-preview-code">{active.code}</span>
                  </div>

                  <p className="product-preview-desc">{active.desc}</p>

                  <div className="product-preview-specs">
                    <div className="product-spec"><small>Thickness</small><strong>{active.thickness}</strong></div>
                    <div className="product-spec"><small>Core</small><strong>{active.core}</strong></div>
                    <div className="product-spec"><small>Glue</small><strong>{active.glue}</strong></div>
                  </div>

                  <a href="#" className="product-preview-link">
                    <span>View product details</span>
                    <span>↗</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
