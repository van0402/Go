export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="reveal">
          <div className="eyebrow">
            <span className="dot"></span> Industrial plywood · Vietnam → Global
          </div>
          <h1>
            ENGINEERED PLYWOOD.
            <br />
            BUILT FOR THE WORLD.
          </h1>
          <p>
            Giải pháp ván ép công nghiệp dành cho các thị trường B2B đòi hỏi chất lượng ổn định,
            tiến độ đáng tin cậy và năng lực cung ứng quốc tế.
          </p>
          <div className="actions">
            <a className="btn primary" href="#products">
              Explore Products ↗
            </a>
            <a className="btn secondary" href="#quote">
              Request a Quote
            </a>
          </div>
          <div className="hero-note">
            <span className="hero-note-line"></span> Europe · Middle East · Global Supply
          </div>
        </div>

        <div className="board-stage reveal">
          <div className="halo"></div>
          <div className="board" aria-label="Layered plywood illustration">
            <div className="sheet"></div>
            <div className="sheet"></div>
            <div className="sheet"></div>
            <div className="sheet"></div>
            <div className="sheet"></div>
          </div>
          <div className="floating-tag tag-1">
            <b>80 containers</b>Supply capability / month
          </div>
          <div className="floating-tag tag-2">
            <b>30 days</b>Average lead time
          </div>
        </div>
      </div>
    </section>
  )
}