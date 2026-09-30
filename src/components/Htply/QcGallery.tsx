const QC_COUNT = 41

const qcImages = Array.from({ length: QC_COUNT }, (_, i) => ({
  src: `/images/qc${i + 1}.jpg`,
  alt: `Kiểm tra thành phẩm tại xưởng ${i + 1}`,
}))

export function QcGallery() {
  return (
    <section className="qc-section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">10 · Kiểm tra thành phẩm</div>
            <h2>Công đoạn kiểm tra thành phẩm.</h2>
            <p>
              Mỗi tấm ván được kiểm tra trực tiếp tại xưởng trước khi đóng gói, đảm bảo bề mặt,
              kích thước và chất lượng đạt đúng tiêu chuẩn trước khi xuất kho.
            </p>
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
