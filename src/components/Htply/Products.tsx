export function Products() {
  return (
    <section id="products">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">02 · Featured Products</div>
            <h2>Products made to perform.</h2>
          </div>
          <p>
            Thiết kế section sản phẩm theo kiểu editorial: ít chữ, ảnh lớn, thông số rõ, tập trung
            đúng sản phẩm chủ lực.
          </p>
        </div>

        <div className="products-wrap reveal">
          <article className="product">
            <div className="prod-visual">
              <div className="prod-label">Film Faced Plywood</div>
            </div>
            <div className="product-info">
              <div className="product-num">01 / PRODUCT</div>
              <h3>Film Faced Plywood</h3>
              <p>
                Giải pháp ván ép phủ phim cho công trình, cốp pha và các ứng dụng yêu cầu độ bền bề
                mặt, độ ổn định cao trong quá trình sử dụng.
              </p>
              <div className="chips">
                <span className="chip">Formwork</span>
                <span className="chip">Construction</span>
                <span className="chip">Scaffolding</span>
              </div>
              <a className="btn secondary" href="#quote">
                View Specification ↗
              </a>
            </div>
          </article>

          <article className="product">
            <div className="prod-visual anti">
              <div className="prod-label">Anti-Slip Plywood</div>
            </div>
            <div className="product-info">
              <div className="product-num">02 / PRODUCT</div>
              <h3>Anti-Slip Plywood</h3>
              <p>
                Bề mặt chống trượt dành cho trailer, sàn công nghiệp và các ứng dụng cần độ bám, độ
                bền cùng khả năng chịu tải tốt.
              </p>
              <div className="chips">
                <span className="chip">Trailer</span>
                <span className="chip">Automotive</span>
                <span className="chip">Industrial</span>
              </div>
              <a className="btn secondary" href="#quote">
                View Specification ↗
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}