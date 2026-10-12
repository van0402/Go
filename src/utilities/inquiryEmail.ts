type InquiryDoc = {
  id: number | string
  fullName?: string | null
  company?: string | null
  country?: string | null
  email?: string | null
  phone?: string | null
  targetMarket?: string | null
  product?: string | null
  quantity?: string | null
  incoterm?: string | null
  timing?: string | null
  message?: string | null
}

// Dữ liệu khách nhập đưa vào HTML nên phải escape
const esc = (v: unknown): string =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const oneLine = (v: unknown): string => String(v ?? '').replace(/[\r\n]+/g, ' ').trim()

const NAVY = '#3B4559'
const DEEP = '#2C3444'
const CYAN = '#59CBE8'
const MUTED = '#7A8798'

const label = (t: string) =>
  `<div style="font-size:10px;font-weight:800;letter-spacing:0.8px;color:${MUTED};margin-bottom:9px;">${t}</div>`

const divider = `<div style="height:1px;background:#EDF1F4;margin:18px 0;line-height:1px;font-size:1px;">&nbsp;</div>`

const table = (rows: [string, unknown, string?][]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">${rows
    .map(
      ([k, v, empty]) =>
        `<tr><td style="padding:8px 0;vertical-align:top;width:130px;color:${MUTED};">${k}</td><td style="padding:8px 0;vertical-align:top;font-weight:700;color:${NAVY};">${
          String(v ?? '').trim() ? esc(v) : esc(empty ?? '-')
        }</td></tr>`,
    )
    .join('')}</table>`

export function inquirySubject(doc: InquiryDoc): string {
  const product = oneLine(doc.product)
  const company = oneLine(doc.company)
  const country = oneLine(doc.country)
  return `[HTPLY] New quote request: ${product ? `${product} · ` : ''}${company}${country ? ` (${country})` : ''}`
}

export function inquiryHtml(doc: InquiryDoc, adminUrl: string): string {
  const message = String(doc.message ?? '').trim()
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#E9EEF2;font-family:Arial,Helvetica,sans-serif;color:${NAVY};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E9EEF2;"><tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #D7DEE5;border-radius:14px;overflow:hidden;">
    <tr><td bgcolor="${NAVY}" style="background:${NAVY};background-image:linear-gradient(135deg,${DEEP},${NAVY});padding:24px;color:#ffffff;">
      <div style="font-size:11px;font-weight:800;letter-spacing:1px;color:${CYAN};margin-bottom:7px;">HTPLY WEBSITE</div>
      <div style="font-size:24px;font-weight:700;color:#ffffff;">New Quote Request</div>
      <div style="margin-top:10px;padding:11px 13px;border-radius:9px;background:rgba(89,203,232,0.14);border:1px solid rgba(89,203,232,0.3);font-size:14px;line-height:1.55;font-weight:700;color:#ffffff;">Bạn có một yêu cầu tư vấn mới từ website HTPLY.</div>
      <div style="margin-top:8px;font-size:12px;color:#B8C0CC;">A new B2B inquiry has been submitted from the website.</div>
    </td></tr>
    <tr><td style="padding:24px;">
      ${label('CUSTOMER')}
      ${table([
        ['Name', doc.fullName],
        ['Company', doc.company],
        ['Country', doc.country],
      ])}
      ${divider}
      ${label('CONTACT')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;vertical-align:top;width:130px;color:${MUTED};">Email</td><td style="padding:8px 0;font-weight:700;"><a href="mailto:${esc(doc.email)}" style="color:${NAVY};text-decoration:none;">${esc(doc.email)}</a></td></tr>
        <tr><td style="padding:8px 0;vertical-align:top;color:${MUTED};">Phone</td><td style="padding:8px 0;font-weight:700;color:${NAVY};">${esc(doc.phone)}</td></tr>
      </table>
      ${divider}
      ${label('REQUEST DETAILS')}
      ${table([
        ['Target market', doc.targetMarket, 'Not specified'],
        ['Product', doc.product, 'Not selected'],
        ['Quantity', doc.quantity, 'Not specified'],
        ['Incoterm', doc.incoterm, 'Not specified'],
        ['Timing', doc.timing, 'Not specified'],
      ])}
      ${message ? `${divider}${label('MESSAGE')}<div style="background:#F3F6F8;border:1px solid #E4EAEE;border-radius:10px;padding:15px 16px;font-size:14px;line-height:1.65;white-space:pre-wrap;">${esc(message)}</div>` : ''}
      <a href="${esc(adminUrl)}" style="display:inline-block;margin-top:22px;padding:12px 16px;border-radius:8px;background:${NAVY};color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;">VIEW INQUIRY IN ADMIN</a>
    </td></tr>
    <tr><td style="padding:14px 24px;background:#F8FAFB;border-top:1px solid #EDF1F4;font-size:11px;color:#8B96A5;">Submitted from HTPLY Website · Reply to this email to respond to the customer directly.</td></tr>
  </table>
</td></tr></table>
</body></html>`
}
