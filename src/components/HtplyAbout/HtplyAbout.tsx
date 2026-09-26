'use client'

import { useState } from 'react'
import './htply-about.css'

export function HtplyAbout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="htply-about-page">
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
            <a href="/#products">Products</a>
            <a href="/#factory">Factory</a>
            <a href="/#quality">Quality</a>
            <a href="/#markets">Markets</a>
          </nav>

          <div className="header-actions">
            <a className="quote-btn" href="/#quote">
              Request a Quote
            </a>
            <a className="arrow-btn" href="/#quote">
              ↗
            </a>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
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
          <div className="container intro-grid">
            <div>
              <div className="section-kicker">01 · Who we are</div>
              <h2>Không chỉ cung cấp plywood. Chúng tôi xây dựng sự an tâm trong mỗi lô hàng.</h2>
            </div>
            <div className="intro-copy">
              <p>
                HTPLY Vietnam là doanh nghiệp tập trung vào sản xuất và xuất khẩu ván ép công
                nghiệp cho nhóm khách hàng B2B tại Châu Âu, Trung Đông và các thị trường có yêu cầu
                cao về tính ổn định của sản phẩm.
              </p>
              <p>
                Chúng tôi theo đuổi cách làm rõ ràng từ vật liệu đầu vào, kiểm soát sản xuất, đóng
                gói đến giao hàng, để mỗi đơn hàng không chỉ đạt yêu cầu kỹ thuật mà còn tạo ra sự
                tin cậy trong hợp tác dài hạn.
              </p>
            </div>
          </div>
        </section>

        <section className="metrics">
          <div className="container metric-grid">
            <article className="metric">
              <small>Factory footprint</small>
              <strong>5,000 m²</strong>
              <span>Khu vực sản xuất và kho vận được tổ chức cho hoạt động xuất khẩu.</span>
            </article>
            <article className="metric">
              <small>Production</small>
              <strong>60</strong>
              <span>Containers / month với khả năng duy trì nguồn cung ổn định.</span>
            </article>
            <article className="metric">
              <small>Supply capacity</small>
              <strong>80</strong>
              <span>Containers / month theo kế hoạch cung ứng mở rộng.</span>
            </article>
            <article className="metric">
              <small>Main markets</small>
              <strong>EU · ME</strong>
              <span>Định hướng các thị trường Châu Âu và Trung Đông.</span>
            </article>
          </div>
        </section>

        <section className="story">
          <div className="container story-grid">
            <div className="story-media">
              <img className="main" src="/images/d4.jpg" alt="HTPLY production" />
              <img className="secondary" src="/images/d6.jpg" alt="HTPLY log cross-section" />
            </div>

            <div className="story-copy">
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
            <div className="values-head">
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
              <article className="value-card">
                <div className="value-num">01 / RELIABILITY</div>
                <div>
                  <h3>Ổn định</h3>
                  <p>Chất lượng đồng đều, thông tin rõ ràng và kế hoạch cung ứng có thể dự đoán.</p>
                </div>
              </article>

              <article className="value-card">
                <div className="value-num">02 / PRECISION</div>
                <div>
                  <h3>Chính xác</h3>
                  <p>
                    Chú trọng thông số, kiểm soát công đoạn và giảm sai lệch trong từng đơn hàng.
                  </p>
                </div>
              </article>

              <article className="value-card">
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

        <section className="promise">
          <div className="container">
            <div className="promise-inner">
              <div className="section-kicker">04 · Our promise</div>
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
