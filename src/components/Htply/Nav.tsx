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
            <a href="/products">Products</a>
            <a href="/factory">Factory</a>
            <a href="#quality">Quality</a>
          </div>
          <div className="nav-actions">
            
          </div>
        </nav>
      </div>
    </div>
  )
}