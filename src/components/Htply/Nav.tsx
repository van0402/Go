export function Nav() {
  return (
    <div className="nav-wrap">
      <div className="container">
        <nav>
          <a className="brand" href="#top">
            <span className="brand-mark"></span>HTPLY VIETNAM
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#process">Production</a>
            <a href="#quality">Quality</a>
            <a href="#markets">Markets</a>
            <a className="nav-cta" href="#quote">
              Request a Quote ↗
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}