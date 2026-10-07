import './SiteFooter.css'
import { Link } from '@/i18n/routing'

export function SiteFooter() {
  return (
    <footer className="site-footer">
     < div className="site-footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-big">
              <img src="/images/logoo.png" alt="HTPLY Vietnam" />
            </div>
            <p>
              Industrial engineered plywood, produced in Vietnam and supplied to construction,
              formwork and industrial buyers worldwide.
            </p>
          </div>
          <div className="footer-col">
            <b>Company</b>
            <Link href="/about">About</Link>
            <Link href="/factory">Factory</Link>
            <Link href="/#quality">Quality</Link>
            <Link href="/products">Products</Link>
            <Link href="/news">News</Link>
          </div>
          <div className="footer-col">
            <b>Products</b>
            <Link href="/products">Film Faced Plywood</Link>
            <Link href="/products">Anti-Slip Plywood</Link>
            <Link href="/products">Raw Plywood</Link>
            <Link href="/products">LVL</Link>
            <Link href="/contact">Request a Quote</Link>
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