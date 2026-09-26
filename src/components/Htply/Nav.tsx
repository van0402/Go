export function Nav() {
  return (
    <div className="nav-wrap">
      <div className="container">
        <nav>
          <a className="brand" href="#top">
            <img src="/images/logo.png" alt="HTPLY Vietnam" className="brand-mark" />
            HTPLY VIETNAM
          </a>
          <div className="nav-links">
            <a href="#top">Home</a>
            <a href="/about">About</a>
            <a href="#products">Products</a>
            <a href="#factory">Factory</a>
            <a href="#quality">Quality</a>
            <a href="#markets">Markets</a>
          </div>
          <div className="nav-actions">
            <a className="nav-cta" href="#quote">
              Request a Quote
            </a>
            <a className="nav-icon-btn" href="#quote" aria-label="Request a Quote">
              ↗
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}