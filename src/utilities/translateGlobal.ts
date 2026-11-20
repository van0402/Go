import type { Endpoint, Field } from 'payload'
import { translateTexts } from './translate'

// Dịch một global (Factory page, About page, Home…) từ EN sang FR + ES bằng DeepL.
// Chỉ dịch các ô có bản riêng theo ngôn ngữ (localized: true, kiểu text / textarea).
// Ô dùng chung cho mọi ngôn ngữ (số, ảnh, video, danh sách nước…) không bị ghi vào bản FR/ES,
// vì ghi chúng ở locale FR sẽ đè lên giá trị chung của cả EN.

type Obj = Record<string, unknown>
type Slot = { get: () => string; set: (v: string) => void; current: () => string }

const TARGETS = ['fr', 'es'] as const
const isText = (f: Field) => (f.type === 'text' || f.type === 'textarea') && 'localized' in f && f.localized

// Đi qua cấu hình ô và dữ liệu EN, dựng dữ liệu cần ghi cho một ngôn ngữ đích.
// `out`: object sẽ ghi; `src`: dữ liệu EN; `cur`: dữ liệu hiện có của ngôn ngữ đích (để biết ô nào trống).
export function collect(fields: Field[], src: Obj, cur: Obj, out: Obj, slots: Slot[]) {
  for (const f of fields) {
    // Ô chỉ để sắp xếp (row, collapsible, tab không tên): dữ liệu nằm cùng cấp
    if (f.type === 'row' || f.type === 'collapsible') {
      collect(f.fields, src, cur, out, slots)
      continue
    }
    if (f.type === 'tabs') {
      for (const tab of f.tabs) {
        if ('name' in tab && tab.name) {
          const sub: Obj = {}
          collect(tab.fields, (src[tab.name] as Obj) ?? {}, (cur[tab.name] as Obj) ?? {}, sub, slots)
          if (Object.keys(sub).length) out[tab.name] = sub
        } else collect(tab.fields, src, cur, out, slots)
      }
      continue
    }
    if (!('name' in f) || !f.name) continue
    const name = f.name

    if (isText(f)) {
      const en = src[name]
      if (typeof en !== 'string' || !en.trim()) continue
      out[name] = en
      slots.push({
        get: () => en,
        set: (v) => { out[name] = v },
        current: () => (typeof cur[name] === 'string' ? (cur[name] as string) : ''),
      })
      continue
    }

    if (f.type === 'group' && !('localized' in f && f.localized)) {
      const sub: Obj = {}
      collect(f.fields, (src[name] as Obj) ?? {}, (cur[name] as Obj) ?? {}, sub, slots)
      if (Object.keys(sub).length) out[name] = sub
      continue
    }

    // Danh sách dùng chung (không localized) có ô con localized: giữ nguyên mọi dòng (id, ảnh…) theo bản EN,
    // chỉ thay chữ ở ô con localized. Dòng khớp theo id để chú thích ảnh 3 vẫn ở ảnh 3.
    if (f.type === 'array' && !('localized' in f && f.localized)) {
      const rows = Array.isArray(src[name]) ? (src[name] as Obj[]) : []
      if (!rows.length) continue
      const curRows = Array.isArray(cur[name]) ? (cur[name] as Obj[]) : []
      out[name] = rows.map((row) => {
        const curRow = curRows.find((r) => r.id === row.id) ?? {}
        const copy: Obj = { ...row }
        collect(f.fields, row, curRow, copy, slots)
        return copy
      })
    }
    // Các kiểu khác (upload, select, number, ô dùng chung…) bỏ qua: không ghi vào bản FR/ES
  }
}

/** Endpoint POST /api/globals/<slug>/translate. Gửi `{ "onlyEmpty": true }` để chỉ điền các ô FR/ES đang trống. */
export const translateGlobalEndpoint = (slug: string): Endpoint => ({
  path: '/translate',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
    if (!process.env.DEEPL_API_KEY) {
      return Response.json({ error: 'DEEPL_API_KEY is not set on the server' }, { status: 500 })
    }
    let onlyEmpty = false
    try {
      const body = (await req.json?.()) as { onlyEmpty?: boolean } | undefined
      onlyEmpty = Boolean(body?.onlyEmpty)
    } catch {
      // không có body: dịch toàn bộ
    }

    const config = req.payload.config.globals.find((g) => g.slug === slug)
    if (!config) return Response.json({ error: `Unknown global ${slug}` }, { status: 404 })

    try {
      const en = (await req.payload.findGlobal({ slug: slug as never, locale: 'en', depth: 0, req })) as unknown as Obj
      let translated = 0
      for (const locale of TARGETS) {
        const cur = (await req.payload.findGlobal({
          slug: slug as never, locale, fallbackLocale: false, depth: 0, req,
        })) as unknown as Obj
        const data: Obj = {}
        const slots: Slot[] = []
        collect(config.fields, en, cur, data, slots)

        // Chế độ "chỉ ô trống": ô FR/ES đã có chữ thì giữ nguyên, không gửi DeepL
        const todo = onlyEmpty ? slots.filter((s) => !s.current().trim()) : slots
        if (onlyEmpty) slots.filter((s) => s.current().trim()).forEach((s) => s.set(s.current()))
        if (todo.length) {
          const out = await translateTexts(todo.map((s) => s.get()), locale === 'fr' ? 'FR' : 'ES')
          todo.forEach((s, i) => s.set(out[i]))
          translated += todo.length
        }
        if (slots.length) {
          await req.payload.updateGlobal({ slug: slug as never, locale, data: data as never, depth: 0, req })
        }
      }
      return Response.json({ ok: true, translated })
    } catch (err) {
      return Response.json({ error: err instanceof Error ? err.message : 'Translation failed' }, { status: 500 })
    }
  },
})
