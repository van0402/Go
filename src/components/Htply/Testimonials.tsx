'use client'

import { useParallax } from '@/hooks/useParallax'

const testimonials = [
  {
    quote:
      'Chất lượng ván ổn định qua từng lô hàng, tài liệu xuất khẩu rõ ràng và đúng tiến độ container mỗi tháng.',
    name: 'Markus Lindgren',
    role: 'Procurement Lead, Nordic Build BV',
  },
  {
    quote:
      'Đội ngũ phản hồi nhanh, thông số kỹ thuật minh bạch — giúp chúng tôi lên kế hoạch nhập hàng cho cả mùa xây dựng.',
    name: 'Salim Al-Farsi',
    role: 'Trading Director, Al-Farsi Building Materials',
  },
  {
    quote:
      'Ván chống trượt đạt đúng yêu cầu tải trọng cho trailer, kiểm soát chất lượng chặt chẽ trước khi đóng container.',
    name: 'Claire Dubois',
    role: 'Supply Chain Manager, Dubois Logistique',
  },
]

export function Testimonials() {
  const parallaxRef = useParallax<HTMLDivElement>(0.12, 36)

  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">08 · Đánh Giá Khách Hàng</div>
            <h2>Được tin cậy bởi các đối tác nhập khẩu quy mô lớn.</h2>
          </div>
        </div>

        <div className="testimonials reveal" ref={parallaxRef}>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div
                className="testi-card reveal"
                key={t.name}
                style={{
                  transitionDelay: `${i * 90}ms`,
                  ['--slide-x' as string]: i % 2 === 0 ? '-70px' : '70px',
                }}
              >
                <div>
                  <div className="testi-rating">5.0 / 5</div>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="testi-who">
                  <span className="testi-avatar">{t.name.charAt(0)}</span>
                  <div>
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}