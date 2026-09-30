'use client'

import { useState } from 'react'
import { useParallax } from '@/hooks/useParallax'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import './htply-about.css'

export function HtplyAbout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroParallaxRef = useParallax<HTMLElement>(0.12, 36)

  return (
    <div className="htply-about-page">
      <RevealOnScroll scope=".htply-about-page" />
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/">
            <span className="brand-mark">HTP</span>
            <span className="brand-text">HTPLY VIETNAM</span>
          </a>

          <nav className={`nav${menuOpen ? ' mobile-open' : ''}`}>
            <a href="/">Home</a>
            <a className="active" href="/about">
              About
            </a>
            <a href="/products">Products</a>
            <a href="/factory">Factory</a>
            <a href="/#quality">Quality</a>
          </nav>

          <div className="header-actions">
          
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="hero" ref={heroParallaxRef}>
          <div className="container hero-content">
            <div className="eyebrow">About HTPLY Vietnam</div>
            <h1>Built on reliability. Shaped for global supply.</h1>
            <p>
              Từ năng lực sản xuất tại Việt Nam đến những tiêu chuẩn khắt khe của thị trường quốc
              tế, HTPLY xây dựng niềm tin bằng chất lượng ổn định, quy trình rõ ràng và khả năng
              cung ứng dài hạn.
            </p>
          </div>
        </section>

        <section className="intro">
          <div className="container story-grid reveal">
            <div className="story-media">
              <img className="main" src="/images/sp8.jpg" alt="HTPLY factory overview" />
              <img className="secondary" src="/images/spp2.jpg" alt="HTPLY timber stock" />
            </div>

            <div className="story-copy">
              <div className="section-kicker">01 · Who we are</div>
              <h2>Một thương hiệu plywood Việt Nam hướng ra thị trường toàn cầu</h2>
              <p>
                HTPLY VIETNAM được thành lập năm 2024, chuyên cung cấp plywood và ván gỗ công nghiệp cho thị trường B2B quốc tế. Với nhà xưởng khoảng 5.000 m² và năng lực cung ứng lên tới 80 container/tháng, HTPLY tập trung phát triển các dòng Film Faced Plywood, Anti-Slip Plywood và plywood công nghiệp, đồng thời hướng tới các thị trường Châu Âu và Trung Đông. Doanh nghiệp lấy chất lượng ổn định, năng lực cung ứng và phát triển bền vững làm nền tảng cho chiến lược mở rộng toàn cầu
              </p>
            </div>
          </div>
        </section>

        <section className="metrics">
          <div className="container metric-grid">
            <article className="metric reveal" style={{ transitionDelay: '0ms' }}>
              <small>Factory footprint</small>
              <strong>5,000 m²</strong>
              <span>Khu vực sản xuất và kho vận được tổ chức cho hoạt động xuất khẩu.</span>
            </article>
            <article className="metric reveal" style={{ transitionDelay: '90ms' }}>
              <small>Production</small>
              <strong>60</strong>
              <span>Containers / month với khả năng duy trì nguồn cung ổn định.</span>
            </article>
            <article className="metric reveal" style={{ transitionDelay: '180ms' }}>
              <small>Supply capacity</small>
              <strong>80</strong>
              <span>Containers / month theo kế hoạch cung ứng mở rộng.</span>
            </article>
            <article className="metric reveal" style={{ transitionDelay: '270ms' }}>
              <small>Main markets</small>
              <strong>EU · ME</strong>
              <span>Định hướng các thị trường Châu Âu và Trung Đông.</span>
            </article>
          </div>
        </section>

        <section className="story">
          <div className="container story-grid">
            <div className="story-media reveal">
              <img className="main" src="/images/d4.jpg" alt="HTPLY production" />
              <img className="secondary" src="/images/d6.jpg" alt="HTPLY log cross-section" />
            </div>

            <div className="story-copy reveal" style={{ transitionDelay: '120ms' }}>
              <div className="section-kicker">02 · Our approach</div>
              <h2>Từ gỗ đầu vào đến một hệ thống cung ứng đáng tin cậy.</h2>
              <p>
                HTPLY không nhìn sản phẩm như một tấm ván độc lập. Mỗi đơn hàng là kết quả của một
                chuỗi vận hành gồm lựa chọn nguyên liệu, ép, xử lý bề mặt, kiểm tra chất lượng,
                đóng gói và logistics.
              </p>

              <div className="story-points">
                <div className="point">
                  <div className="point-icon">01</div>
                  <div>
                    <strong>Kiểm soát nguyên liệu</strong>
                    <span>
                      Ưu tiên tính đồng đều và khả năng truy xuất của nguồn nguyên liệu đầu vào.
                    </span>
                  </div>
                </div>

                <div className="point">
                  <div className="point-icon">02</div>
                  <div>
                    <strong>Chuẩn hóa quy trình</strong>
                    <span>
                      Kiểm soát các công đoạn quan trọng để giảm sai lệch giữa các lô sản xuất.
                    </span>
                  </div>
                </div>

                <div className="point">
                  <div className="point-icon">03</div>
                  <div>
                    <strong>Định hướng xuất khẩu</strong>
                    <span>
                      Sản xuất theo nhu cầu kỹ thuật, đóng gói và chứng từ của từng thị trường.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="values">
          <div className="container">
            <div className="values-head reveal">
              <div>
                <div className="section-kicker">03 · What we value</div>
                <h2>Ba giá trị giữ cho HTPLY đi đúng hướng.</h2>
              </div>
              <p>
                Một thương hiệu công nghiệp không cần nói quá nhiều. Điều quan trọng là khách hàng
                có thể dự đoán được chất lượng, tiến độ và cách chúng tôi xử lý công việc.
              </p>
            </div>

            <div className="values-grid">
              <article className="value-card reveal" style={{ transitionDelay: '0ms' }}>
                <div className="value-num">01 / RELIABILITY</div>
                <div>
                  <h3>Ổn định</h3>
                  <p>Chất lượng đồng đều, thông tin rõ ràng và kế hoạch cung ứng có thể dự đoán.</p>
                </div>
              </article>

              <article className="value-card reveal" style={{ transitionDelay: '90ms' }}>
                <div className="value-num">02 / PRECISION</div>
                <div>
                  <h3>Chính xác</h3>
                  <p>
                    Chú trọng thông số, kiểm soát công đoạn và giảm sai lệch trong từng đơn hàng.
                  </p>
                </div>
              </article>

              <article className="value-card reveal" style={{ transitionDelay: '180ms' }}>
                <div className="value-num">03 / PARTNERSHIP</div>
                <div>
                  <h3>Dài hạn</h3>
                  <p>
                    Không chỉ bán một lô hàng, mà hướng đến quan hệ cung ứng có khả năng phát
                    triển cùng khách hàng.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="history">
          <div className="container">
            <div className="history-head reveal">
              <div className="section-kicker">04 · History</div>
              <h2>Từ nền tảng ban đầu đến năng lực cung ứng toàn cầu.</h2>
            </div>

            <div className="history-list">
              <div className="history-row reveal" style={{ transitionDelay: '0ms' }}>
                <div className="history-year">2024</div>
                <div className="history-title">Thành lập</div>
                <div className="history-desc">
                  HTPLY VIETNAM ra đời, mở rộng năng lực sang thị trường plywood kỹ thuật.
                </div>
              </div>

              <div className="history-row reveal" style={{ transitionDelay: '60ms' }}>
                <div className="history-year">2024</div>
                <div className="history-title">Phát triển sản phẩm</div>
                <div className="history-desc">
                  Xây dựng danh mục Film Faced, Anti-Slip và Commercial Plywood cho thị trường
                  quốc tế.
                </div>
              </div>

              <div className="history-row reveal" style={{ transitionDelay: '120ms' }}>
                <div className="history-year">2025</div>
                <div className="history-title">Củng cố năng lực</div>
                <div className="history-desc">
                  Hoàn thiện năng lực sản xuất và cung ứng với quy mô 5.000 m², hướng tới 80
                  container/tháng.
                </div>
              </div>

              <div className="history-row reveal" style={{ transitionDelay: '180ms' }}>
                <div className="history-year">25–26</div>
                <div className="history-title">Chuẩn hóa chất lượng</div>
                <div className="history-desc">
                  Tăng cường kiểm soát nguyên liệu, ép, độ ổn định và truy xuất nguồn gốc.
                </div>
              </div>

              <div className="history-row reveal" style={{ transitionDelay: '240ms' }}>
                <div className="history-year">2026</div>
                <div className="history-title">Vươn ra toàn cầu</div>
                <div className="history-desc">
                  Mở rộng thị trường B2B tại Châu Âu, Trung Đông và quốc tế.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mission-vision">
          <div className="container mv-grid">
            <div className="mv-col reveal" style={{ transitionDelay: '0ms' }}>
              <div className="section-kicker">05A · Mission</div>
              <h2>Sứ mệnh</h2>
              <p>
                Cung cấp plywood chất lượng cao với sự ổn định, tin cậy và trách nhiệm trong từng
                đơn hàng, đồng hành cùng khách hàng B2B trên thị trường quốc tế.
              </p>
            </div>
            <div className="mv-col reveal" style={{ transitionDelay: '90ms' }}>
              <div className="section-kicker">05B · Vision</div>
              <h2>Tầm nhìn</h2>
              <p>
                Trở thành thương hiệu plywood Việt Nam uy tín, bền vững và có năng lực cạnh tranh
                quốc tế, từng bước mở rộng vị thế trên chuỗi cung ứng toàn cầu.
              </p>
            </div>
          </div>
        </section>

        <section className="promise">
          <div className="container">
            <div className="promise-inner reveal">
              <div className="section-kicker">06 · Our promise</div>
              <h2>Reliability, built into every sheet.</h2>
              <p>
                Mỗi tấm plywood rời nhà máy phải đại diện cho cùng một điều: chất lượng có thể
                kiểm chứng, nguồn cung có thể dựa vào và một đối tác sẵn sàng đi đường dài.
              </p>
              <div className="promise-actions">
                <a className="promise-btn primary" href="/#products">
                  Explore Products ↗
                </a>
                <a className="promise-btn secondary" href="/#factory">
                  Visit Our Factory
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-row">
          <div>HTPLY VIETNAM</div>
          <div>Industrial Plywood · Vietnam → Global</div>
        </div>
      </footer>
    </div>
  )
}
