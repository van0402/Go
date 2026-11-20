// Giới hạn số lần gửi theo cửa sổ thời gian, lưu trong bộ nhớ của tiến trình Node.
// Đủ cho 1 VPS chạy 1 tiến trình; khởi động lại server thì bộ đếm về 0.
type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

/** Trả về true nếu còn được phép, false nếu đã vượt `limit` lần trong `windowMs`. */
export function hitRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()

  // Dọn các mục đã hết hạn để Map không phình mãi
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k)
  }

  const b = buckets.get(key)
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (b.count >= limit) return false
  b.count++
  return true
}

/**
 * IP thật của khách.
 * 1. Site chạy sau Cloudflare: CF-Connecting-IP là IP khách do Cloudflare đặt
 *    (X-Real-IP lúc này chỉ là IP máy chủ Cloudflare, nhiều khách dùng chung).
 * 2. Không có Cloudflare: X-Real-IP do nginx đặt bằng $remote_addr.
 * 3. Chỉ có X-Forwarded-For: lấy địa chỉ CUỐI (do proxy gần nhất thêm), vì địa chỉ đầu khách tự điền được.
 */
export function clientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip')?.trim()
  if (cf) return cf
  const real = headers.get('x-real-ip')?.trim()
  if (real) return real
  const xff = headers.get('x-forwarded-for')
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean)
    if (parts.length) return parts[parts.length - 1]
  }
  return 'unknown'
}
