export function StatStrip() {
  return (
    <div className="container stats-grid reveal">
      <div className="stat-card factory">
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
        <div className="stat-value">5,000 m<sup>2</sup></div>
        <div className="stat-desc">Production &amp; warehouse footprint</div>
      </div>

      <div className="stat-card production">
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
        <div className="stat-value">60</div>
        <div className="stat-desc">Containers / month</div>
      </div>

      <div className="stat-card supply">
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
        <div className="stat-value">80</div>
        <div className="stat-desc">Containers / month</div>
      </div>

      <div className="stat-card markets">
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
  )
}