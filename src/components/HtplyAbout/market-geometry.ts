import { MAP_COUNTRIES, MAP_POINTS } from './export-map-data'

export type MarketInput = { id: string; code: string }
export type MarketPoint = {
  id: string; code: string; name: string; short: string
  x: number; y: number; path: string; flag: string
}

const ORIGIN: [number, number] = [882.47, 229.7] // Việt Nam trên bản đồ

// điểm ghim: giữa phần lãnh thổ lớn nhất của nước (tránh bị kéo lệch bởi hải đảo xa)
function center(path: string) {
  let best: { area: number; x: number; y: number } | null = null
  for (const sub of path.split('M').filter(Boolean)) {
    const n = sub.replace(/[LZ]/g, ' ').split(/[ ,]+/).filter(Boolean).map(Number)
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    for (let i = 0; i + 1 < n.length; i += 2) {
      x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i])
      y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1])
    }
    const area = (x1 - x0) * (y1 - y0)
    if (!best || area > best.area) best = { area, x: (x0 + x1) / 2, y: (y0 + y1) / 2 }
  }
  return best ?? { area: 0, x: ORIGIN[0], y: ORIGIN[1] }
}

// đường cong từ Việt Nam sang nước đó
function arc(x: number, y: number) {
  const dx = x - ORIGIN[0]
  const d = Math.hypot(dx, y - ORIGIN[1])
  const lift = Math.max(40, d - 75)
  return `M${ORIGIN[0]},${ORIGIN[1]} C${(ORIGIN[0] + dx * 0.18).toFixed(2)},${(ORIGIN[1] - lift).toFixed(2)} ${(ORIGIN[0] + dx * 0.72).toFixed(2)},${(y - lift * 0.55).toFixed(2)} ${x.toFixed(2)},${y.toFixed(2)}`
}

// 9 nước cũ giữ nguyên ghim và đường cong đã chỉnh tay; nước mới thì tự tính
export function buildPoint({ id, code }: MarketInput): MarketPoint | null {
  const flag = `/images/flags/svg/${code}.svg`
  const preset = MAP_POINTS.find((p) => p.id === id)
  if (preset) return { id, code, name: preset.name, short: preset.short, x: preset.x, y: preset.y, path: preset.path, flag }
  const country = MAP_COUNTRIES.find((c) => c.id === id)
  if (!country) return null
  const c = center(country.path)
  return { id, code, name: country.name, short: country.name, x: c.x, y: c.y, path: arc(c.x, c.y), flag }
}