export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-big">HTPLY VIETNAM</div>
            <p>
              Industrial engineered plywood, produced in Vietnam and supplied to construction,
              formwork and industrial buyers worldwide.
            </p>
          </div>
          <div className="footer-col">
            <b>Company</b>
            <a href="#about">About</a>
            <a href="#process">Production</a>
            <a href="#quality">Quality</a>
            <a href="#markets">Markets</a>
          </div>
          <div className="footer-col">
            <b>Products</b>
            <a href="#products">Film Faced Plywood</a>
            <a href="#products">Anti-Slip Plywood</a>
            <a href="#quote">Request a Quote</a>
          </div>
          <div className="footer-col">
            <b>Contact</b>
            <a href="mailto:sales@htply.vn">sales@htply.vn</a>
            <a href="tel:+84000000000">+84 000 000 000</a>
            <a href="#top">Vietnam → Global</a>
          </div>
        </div>
        <div className="footer-row">
          <span>© 2026 HTPLY Vietnam. All rights reserved.</span>
          <span>Demo concept by SMEE</span>
        </div>
      </div>
    </footer>
  )
}