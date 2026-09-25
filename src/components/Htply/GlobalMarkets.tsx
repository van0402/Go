export function GlobalMarkets() {
  return (
    <section id="markets">
      <div className="container global reveal">
        <div className="global-copy">
          <div className="section-kicker">07 · Global Markets</div>
          <h2>Made in Vietnam. Built for global markets.</h2>
          <p>
            Hiện định hướng trọng tâm là Châu Âu và Trung Đông. Phần bản đồ có thể nâng cấp thành
            route animation từ Việt Nam đến từng thị trường xuất khẩu thực tế.
          </p>
          <div className="eyebrow" style={{ marginTop: '18px', marginBottom: 0 }}>
            <span className="dot"></span> Ưu tiên 6–12 tháng tới: Châu Âu
          </div>
        </div>

        <div className="map">
          <svg viewBox="0 0 900 500" role="img" aria-label="Abstract global market map">
            <path
              d="M110 235 C170 140, 265 140, 330 200 S440 310, 530 235 S690 125, 795 205"
              fill="none"
              stroke="#B89A82"
              strokeWidth="34"
              strokeLinecap="round"
              opacity=".18"
            />
            <path
              d="M126 180 C180 110, 230 118, 280 160 M230 300 C330 245, 390 285, 450 320 M560 142 C650 100, 725 132, 790 165"
              fill="none"
              stroke="#7D6554"
              strokeWidth="24"
              strokeLinecap="round"
              opacity=".17"
            />
            <circle className="map-dot" cx="625" cy="295" r="8" />
            <circle className="map-dot" cx="420" cy="170" r="7" />
            <circle className="map-dot" cx="545" cy="225" r="7" />
            <path className="route" d="M625 295 C590 210, 500 165, 420 170" />
            <path className="route" d="M625 295 C610 260, 575 230, 545 225" />
            <text x="638" y="316" fontSize="13" fill="#533E32" fontWeight="700">
              VIETNAM
            </text>
            <text x="355" y="155" fontSize="13" fill="#533E32" fontWeight="700">
              EUROPE
            </text>
            <text x="512" y="210" fontSize="13" fill="#533E32" fontWeight="700">
              MIDDLE EAST
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}