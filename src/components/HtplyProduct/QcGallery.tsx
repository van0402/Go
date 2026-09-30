const QC_COUNT = 41

const qcImages = Array.from({ length: QC_COUNT }, (_, i) => ({
  src: `/images/qc${i + 1}.jpg`,
  alt: `Kiểm tra thành phẩm tại xưởng ${i + 1}`,
}))

export function QcGallery() {
  return (
    <section className="qc-section">
      <div className="products-container">
        <div className="product-section-head reveal">
          <div>
            <div className="product-section-kicker">10 · Kiểm tra thành phẩm</div>
          </div>
        </div>
      </div>

      <div className="qc-marquee reveal">
        <div className="qc-track">
          {[...qcImages, ...qcImages].map((img, i) => (
            <figure className="qc-item" key={`${img.src}-${i}`}>
              <span className="qc-index">{String((i % qcImages.length) + 1).padStart(2, '0')}</span>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
