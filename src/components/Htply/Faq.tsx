'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Đơn hàng tối thiểu (MOQ) là bao nhiêu?',
    a: 'MOQ tiêu chuẩn là 1 container 20ft/40ft cho mỗi đơn hàng. Với đơn hàng nhỏ hơn, vui lòng liên hệ trực tiếp để trao đổi phương án ghép hàng.',
  },
  {
    q: 'Thời gian sản xuất và giao hàng mất bao lâu?',
    a: 'Thời gian trung bình từ khi chốt đơn đến khi hàng lên tàu là khoảng 30 ngày, tùy quy cách và số lượng container.',
  },
  {
    q: 'HTPLY có hỗ trợ chứng chỉ chất lượng/xuất khẩu không?',
    a: 'Có. Hồ sơ chất lượng, kiểm định độ dày/độ ẩm/độ bám dính và các chứng từ xuất khẩu được cung cấp đầy đủ theo từng lô hàng.',
  },
  {
    q: 'Có thể tùy chỉnh kích thước, độ dày theo yêu cầu không?',
    a: 'Có thể tùy chỉnh theo yêu cầu kỹ thuật của buyer. Vui lòng gửi thông số cụ thể trong form "Request a Quote" để được báo giá chính xác.',
  },
  {
    q: 'HTPLY giao hàng tới những thị trường nào?',
    a: 'Hiện tại tập trung chính vào thị trường Châu Âu và Trung Đông, có thể mở rộng theo yêu cầu tuyến vận chuyển cụ thể.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">09 · FAQ</div>
            <h2>Questions, answered.</h2>
          </div>
          <p>Những câu hỏi thường gặp nhất từ buyer quốc tế trước khi đặt đơn hàng đầu tiên.</p>
        </div>

        <div className="faq-list reveal">
          {faqs.map((item, index) => (
            <details
              className="faq-item"
              key={item.q}
              open={openIndex === index}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) setOpenIndex(index)
              }}
            >
              <summary>
                {item.q}
                <span className="faq-plus">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}