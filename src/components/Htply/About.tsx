import { CountUp } from './CountUp'

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="container stats-grid">
          <div
            className="stat-card factory reveal"
            style={{ transitionDelay: '0ms', ['--slide-x' as string]: '-70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">01</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"></path>
                <path d="M5 21V9l5-3v15"></path>
                <path d="M10 21v-7l4-2v9"></path>
                <path d="M17 21v-4l2-1v5"></path>
              </svg>
            </div>
            <div className="stat-label">Factory</div>
            <div className="stat-value">
              <CountUp end={5000} /> m<sup>2</sup>
            </div>
            <div className="stat-desc">Production &amp; warehouse footprint</div>
          </div>

          <div
            className="stat-card production reveal"
            style={{ transitionDelay: '90ms', ['--slide-x' as string]: '70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">02</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="1"></rect>
                <path d="M3 9h18"></path>
                <path d="M8 4v16"></path>
                <path d="M16 4v16"></path>
              </svg>
            </div>
            <div className="stat-label">Production</div>
            <div className="stat-value">
              <CountUp end={60} />
            </div>
            <div className="stat-desc">Containers / month</div>
          </div>

          <div
            className="stat-card supply reveal"
            style={{ transitionDelay: '180ms', ['--slide-x' as string]: '-70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">03</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 18h20"></path>
                <path d="M3 18V8l5 2 4-4 3 2h4l2 4v6"></path>
                <circle cx="8" cy="18" r="1.5"></circle>
                <circle cx="18" cy="18" r="1.5"></circle>
              </svg>
            </div>
            <div className="stat-label">Supply</div>
            <div className="stat-value">
              <CountUp end={80} />
            </div>
            <div className="stat-desc">Containers / month</div>
          </div>

          <div
            className="stat-card markets reveal"
            style={{ transitionDelay: '270ms', ['--slide-x' as string]: '70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">04</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M3 12h18"></path>
                <path d="M12 3a15 15 0 0 1 0 18"></path>
                <path d="M12 3a15 15 0 0 0 0 18"></path>
              </svg>
            </div>
            <div className="stat-label">Markets</div>
            <div className="stat-value">EU · ME</div>
            <div className="stat-desc">Europe &amp; Middle East</div>
          </div>
        </div>

        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="section-kicker">01 · About HTPLY</div>
              <h2>Sự tin cậy được tạo nên trong từng tấm ván</h2>
              <p>
                HTPLY Vietnam là doanh nghiệp xuất khẩu ván ép công nghiệp, tập trung vào phân khúc trung và cao cấp cho khách hàng B2B tại Châu Âu và Trung Đông. Chúng tôi hướng tới xây dựng một hệ thống cung ứng ổn định, bền vững và theo tiêu chuẩn quốc tế.
              </p>
            </div>
          </div>

          <div className="about reveal">
            <div className="about-card">
              <div className="big-quote">
                &ldquo;Không chỉ cung cấp ván ép, HTPLY mang đến sự tin cậy trong từng lô hàng&rdquo;
              </div>
            </div>
            <div className="about-card dark">
              <h3>What shapes how we work.</h3>
              <div className="value-list">
                <div className="value">
                  <span>01</span>
                  <div>
                    <b>Reliable</b>
                    <div>Ổn định về chất lượng, tiến độ và cam kết.</div>
                  </div>
                </div>
                <div className="value">
                  <span>02</span>
                  <div>
                    <b>Sustainable</b>
                    <div>Định hướng phát triển xanh và có trách nhiệm.</div>
                  </div>
                </div>
                <div className="value">
                  <span>03</span>
                  <div>
                    <b>Global</b>
                    <div>Tư duy sản phẩm và dịch vụ theo chuẩn thị trường quốc tế.</div>
                  </div>
                </div>
                <div className="value">
                  <span>04</span>
                  <div>
                    <b>Máy móc &amp; công nghệ</b>
                    <div>
                      Dây chuyền ép nóng, cắt và kiểm định hiện đại, tối ưu độ chính xác kích thước
                      và chất lượng bề mặt.
                    </div>
                  </div>
                </div>
                <div className="value">
                  <span>05</span>
                  <div>
                    <b>Chứng nhận sản xuất</b>
                    <div>
                      Đạt chứng nhận FSC, tuân thủ tiêu chuẩn phát thải formaldehyde E0/E0.5 theo yêu
                      cầu xuất khẩu Châu Âu.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

