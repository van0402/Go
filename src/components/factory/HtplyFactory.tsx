'use client'

import { useState } from 'react'
import { useParallax } from '@/hooks/useParallax'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import './HtplyFactory.css'

const productionSteps = [
  {
    number: '01',
    title: 'Lựa chọn nguyên liệu',
    desc: 'Kiểm tra veneer và nguồn nguyên liệu trước khi đưa vào sản xuất.',
  },
  {
    number: '02',
    title: 'Xử lý veneer',
    desc: 'Sắp xếp và xử lý lớp veneer để đảm bảo cấu trúc lõi ổn định.',
  },
  {
    number: '03',
    title: 'Phủ keo',
    desc: 'Kiểm soát loại keo và lượng keo phù hợp với từng yêu cầu sản phẩm.',
  },
  {
    number: '04',
    title: 'Ép nguội & ép nóng',
    desc: 'Kiểm soát nhiệt độ, áp suất và thời gian để tạo liên kết bền giữa các lớp.',
  },
  {
    number: '05',
    title: 'Hoàn thiện bề mặt',
    desc: 'Cắt cạnh, chà nhám và xử lý bề mặt theo thông số yêu cầu.',
  },
  {
    number: '06',
    title: 'Kiểm tra & đóng gói',
    desc: 'Kiểm tra kích thước, bề mặt, sau đó đóng gói cho vận chuyển container.',
  },
]

const qualityItems = [
  {
    number: '01',
    title: 'Thickness',
    desc: 'Kiểm soát độ dày và sai số theo thông số đặt hàng.',
  },
  {
    number: '02',
    title: 'Moisture',
    desc: 'Theo dõi độ ẩm phù hợp với từng nhóm sản phẩm.',
  },
  {
    number: '03',
    title: 'Bonding',
    desc: 'Kiểm soát khả năng liên kết giữa các lớp veneer.',
  },
  {
    number: '04',
    title: 'Surface',
    desc: 'Kiểm tra bề mặt trước khi đóng gói và xuất kho.',
  },
]

export function HtplyFactory() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroParallaxRef = useParallax<HTMLElement>(0.12, 36)

  return (
    <div className="htply-factory-page">
      <RevealOnScroll scope=".htply-factory-page" />
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/">
            <span className="brand-mark">HTP</span>
            <span className="brand-text">HTPLY VIETNAM</span>
          </a>

          <nav className={`nav${menuOpen ? ' mobile-open' : ''}`}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/products">Products</a>
            <a className="active" href="/factory">
              Factory
            </a>
            <a href="/#quality">Quality</a>
          </nav>

          <div className="header-actions">
            
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="factory-hero" ref={heroParallaxRef}>
          <div className="container hero-content reveal">
            <div className="eyebrow">HTPLY Factory · Vietnam</div>

            <h1>Nơi chất lượng bắt đầu từ quy trình.</h1>

            <p>
              Từ nguyên liệu đầu vào đến đóng gói xuất khẩu, mỗi công đoạn đều
              được tổ chức để duy trì tính ổn định giữa các lô hàng.
            </p>
          </div>
        </section>

        <section className="factory-overview">
          <div className="container">
            <div className="overview-grid reveal">
              <div>
                <div className="section-kicker">01 · Factory Overview</div>
                <h2>Một hệ thống sản xuất được tổ chức cho xuất khẩu.</h2>
              </div>

              <div className="overview-copy">
                <p>
                  Nhà máy HTPLY được tổ chức theo hướng tối ưu luồng nguyên liệu,
                  sản xuất, kiểm tra và đóng gói.
                </p>

                <p>
                  Mỗi khu vực đảm nhận một vai trò riêng nhằm giảm sai lệch trong
                  quá trình vận hành và duy trì tính nhất quán của sản phẩm.
                </p>
              </div>
            </div>

            <div className="overview-image reveal" style={{ transitionDelay: '150ms' }}>
              <img src="/images/sp8.jpg" alt="HTPLY Factory" />
            </div>
          </div>
        </section>

        <section className="production-flow">
          <div className="container">
            <div className="flow-head reveal">
              <div>
                <div className="section-kicker">02 · Production Flow</div>
                <h2>Từ veneer đến thành phẩm.</h2>
              </div>
            </div>

            <div className="steps">
              {productionSteps.map((step, i) => (
                <article
                  className="step reveal"
                  key={step.number}
                  style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                >
                  <div className="step-num">{step.number}</div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="inside-factory">
          <div className="container">
            <div className="section-kicker">03 · Inside the Factory</div>

            <div className="editorial-grid">
              <article
                className="editorial-card editorial-card-large reveal"
                style={{ transitionDelay: '0ms' }}
              >
                <img src="/images/sp5.jpg" alt="Pressing process" />

                <div className="editorial-copy">
                  <small>Pressing</small>
                  <h3>Kiểm soát áp lực, nhiệt độ và thời gian.</h3>
                  <p>
                    Công đoạn ép quyết định độ liên kết và tính ổn định của cấu
                    trúc plywood.
                  </p>
                </div>
              </article>

              <div className="editorial-side">
                <article className="editorial-card reveal" style={{ transitionDelay: '140ms' }}>
                  <img src="/images/spp2.jpg" alt="Veneer preparation" />

                  <div className="editorial-copy">
                    <small>Veneer</small>
                    <h3>Chuẩn hóa từ lớp lõi.</h3>
                  </div>
                </article>

                <article className="editorial-card reveal" style={{ transitionDelay: '220ms' }}>
                  <img src="/images/sp1.jpg" alt="Finishing process" />

                  <div className="editorial-copy">
                    <small>Finishing</small>
                    <h3>Hoàn thiện để đạt độ chính xác.</h3>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="quality-control">
          <div className="container">
            <div className="quality-head reveal">
              <div>
                <div className="section-kicker">04 · Quality Control</div>
                <h2>Chất lượng được kiểm soát trong toàn bộ quá trình.</h2>
              </div>

              <p>
                Không đợi đến cuối dây chuyền mới kiểm tra. Những tiêu chí quan
                trọng được theo dõi xuyên suốt để giảm sai lệch giữa các lô hàng.
              </p>
            </div>

            <div className="quality-grid">
              {qualityItems.map((item, i) => (
                <article
                  className="quality-card reveal"
                  key={item.number}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <small>{item.number}</small>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="supply-capacity">
          <div className="container supply-grid">
            <div className="supply-copy reveal">
              <div className="section-kicker">05 · Supply Capacity</div>

              <h2>Năng lực sản xuất được xây dựng cho nguồn cung ổn định.</h2>

              <p>
                Với khách hàng B2B, chất lượng chỉ là một phần. Khả năng duy trì
                tiến độ, sản lượng và tính đồng nhất giữa các lô hàng mới là nền
                tảng của quan hệ cung ứng dài hạn.
              </p>

              <div className="big-number">
                60+
                <span>Containers / month</span>
              </div>
            </div>

            <div className="supply-image reveal" style={{ transitionDelay: '150ms' }}>
              <img src="/images/sp7.jpg" alt="HTPLY logistics" />
            </div>
          </div>
        </section>

        <section className="factory-cta">
          <div className="container">
            <div className="factory-cta-box reveal">
              <div className="section-kicker">06 · Global Supply</div>

              <h2>Sản xuất tại Việt Nam. Sẵn sàng cho thị trường toàn cầu.</h2>

              <p>
                Trao đổi với HTPLY về thông số kỹ thuật, sản lượng, cấu hình sản
                phẩm và yêu cầu đóng gói cho thị trường của bạn.
              </p>

              <div className="cta-actions">
                <a className="btn-light" href="/#quote">
                  Request a Quote ↗
                </a>

                <a className="btn-ghost" href="/products">
                  Explore Products
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

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
              <a href="/about">About</a>
              <a href="/factory">Production</a>
              <a href="/#quality">Quality</a>
            </div>
            <div className="footer-col">
              <b>Products</b>
              <a href="/products">Film Faced Plywood</a>
              <a href="/products">Anti-Slip Plywood</a>
              <a href="/products">Raw Plywood</a>
              <a href="/products">LVL</a>
              <a href="/#quote">Request a Quote</a>
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
    </div>
  )
}
