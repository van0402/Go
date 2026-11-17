// Biến lỗi trả về từ máy chủ / mạng thành câu dễ đọc cho người nhập liệu (hiện trong ErrorBanner).

type ErrJson = {
  errors?: { message?: string; data?: { errors?: { message?: string; path?: string; field?: string }[] } }[]
  error?: string
  message?: string
} | null | undefined

/** status: mã HTTP của phản hồi; json: nội dung phản hồi (có thể rỗng nếu máy chủ trả HTML). */
export function explainError(status: number, json: ErrJson): string {
  const first = json?.errors?.[0]
  const raw = (first?.message || json?.error || json?.message || '').trim()
  const details = (first?.data?.errors ?? [])
    .map((x) => [x.path || x.field, x.message].filter(Boolean).join(': '))
    .filter(Boolean)
    .join('; ')

  if (status === 401 || status === 403) {
    return 'You are not logged in (your session may have expired). Open /admin in a new tab, log in again, then press the button again. Nothing you typed on this page is lost.'
  }
  if (status === 413) {
    return 'The file is too large for the server. Use a smaller file, or ask the developer to raise the upload limit.'
  }
  // Địa chỉ trang (slug) được sinh từ tên và phải duy nhất
  if (/field is invalid: slug/i.test(raw) || /slug/i.test(details)) {
    return 'Another product already uses this name, so its page address would be the same. Change the name (for example add the main product: “Film Faced – Standard Form”) or delete the old product with the same name (also check the Drafts).'
  }
  if (/duplicate|unique/i.test(raw + details)) {
    return `This value is already used by another item. ${details || raw}`.trim()
  }
  if (/quota/i.test(raw) || status === 456) {
    return 'The translation service has reached its monthly limit. Try again later or translate manually.'
  }
  const text = [raw, details].filter(Boolean).join(' — ')
  if (text) return text
  if (status >= 500) return `The server had a problem (error ${status}). Please try again. If it keeps happening, tell the developer.`
  return `The request failed (error ${status}). Please try again.`
}

/** Lỗi ném ra từ fetch (mất mạng...) hoặc từ Error do mình tạo. */
export function errorToText(e: unknown): string {
  if (e instanceof TypeError) return 'Cannot reach the server. Check your internet connection and try again.'
  if (e instanceof Error && e.message) return e.message
  return 'Something went wrong. Please try again.'
}
