'use client'

export function QuoteForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Demo form — yêu cầu báo giá đã được ghi nhận.')
  }

  return (
    <section id="quote">
      <div className="container reveal">
        <div className="quote">
          <div>
            <div className="section-kicker">10 · Request a Quote</div>
            <h2>Let&apos;s build the next shipment together.</h2>
            <p>
              Buyer chỉ cần gửi nhu cầu chính. Phần sales phía sau có thể kết nối CRM, email hoặc
              WhatsApp.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input placeholder="Your name" />
            </div>
            <div className="field">
              <label>Company</label>
              <input placeholder="Company name" />
            </div>
            <div className="field">
              <label>Country</label>
              <input placeholder="Country" />
            </div>
            <div className="field">
              <label>Email / WhatsApp</label>
              <input placeholder="Contact" />
            </div>
            <div className="field">
              <label>Product</label>
              <select>
                <option>Film Faced Plywood</option>
                <option>Anti-Slip Plywood — Wiremesh</option>
                <option>Anti-Slip Plywood — Hexaply</option>
                <option>Raw Plywood</option>
                <option>LVL</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label>Quantity</label>
              <input placeholder="e.g. 2 containers" />
            </div>
            <div className="field full">
              <label>Destination Port</label>
              <input placeholder="e.g. Rotterdam" />
            </div>
            <div className="field full">
              <label>Requirements</label>
              <textarea placeholder="Thickness, size, application, certification..." />
            </div>
            <button className="submit">Send Requirement ↗</button>
          </form>
        </div>
      </div>
    </section>
  )
}