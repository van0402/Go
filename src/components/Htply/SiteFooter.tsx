export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-big">
              <img src="/images/Layer.png" alt="HTPLY Vietnam" />
              HTPLY VIETNAM
            </div>
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
            <a href="#products">Raw Plywood</a>
            <a href="#products">LVL</a>
            <a href="#quote">Request a Quote</a>
          </div>
          <div className="footer-col">
            <b>Contact</b>
            <a href="mailto:info@htplywood.net">info@htplywood.net</a>
            <a href="tel:+84931152468">+84 931 152 468 (Zalo/WhatsApp)</a>
            <a
              href="https://www.facebook.com/profile.php?id=61589328285469"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <span style={{ fontSize: '12px', opacity: 0.75, marginTop: '6px' }}>
              5th Floor, PTP Building, 564 Nguyen Van Cu, Bo De, Hanoi, Vietnam
            </span>
          </div>
        </div>
        <div className="footer-row">
          <span>© 2026 HTPLY Vietnam. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}