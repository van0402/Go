

export function Hero() {
  return (
    <section className="hero">
      <div className="brand-mini">
  <img src="/images/Layer.png" alt="HTPLY Vietnam" />
  HTPLY VIETNAM
</div>
      <div className="container hero-grid">
        <div className="reveal">
          <div className="eyebrow">
            <span className="dot"></span> Industrial plywood · Vietnam → Global
          </div>
          <h1>
            HTPLY - PLywood Supplier with EU's Standards
            {/* <br />
            BUILT FOR THE WORLD. */}
          </h1>
          <div className="actions">
            <a className="btn primary" href="#products">
              Explore Products ↗
            </a>
            <a className="btn secondary" href="#quote">
              Request a Quote
            </a>
          </div>
        </div>

        <div className="board-stage reveal">
          <div className="halo"></div>
          <div className="board" aria-label="HTPLY plywood product">
            <img src="/images/h.png" alt="HTPLY plywood product" />
          </div>
        </div>
      </div>
    </section>
  )
}