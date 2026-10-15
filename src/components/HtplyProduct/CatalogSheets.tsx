'use client'

// Các trang catalog có thông tin sản phẩm (ảnh nằm trong public/images/catalog)
const SHEETS = [
  { src: '/images/catalog/catalog-formwork-lite-standard.jpg', alt: 'Lite Form and Standard Form: surface, size, thickness and glue' },
  { src: '/images/catalog/catalog-formwork-dura-ez.jpg', alt: 'Dura Form and EZ Form: surface, size, thickness and glue' },
]

export function CatalogSheets() {
  return (
    <section className="catalog-section">
      <div className="products-container">
        <div className="product-section-head reveal">
          <div>
            <h2>The product range at a glance.</h2>
          </div>
        </div>

        <div className="catalog-grid">
          {SHEETS.map((s) => (
            <a className="catalog-sheet reveal" key={s.src} href={s.src} target="_blank" rel="noreferrer">
              <img src={s.src} alt={s.alt} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
