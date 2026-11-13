// Nền "vân ván ép": các vòng đồng tâm méo nhẹ, vẽ bằng code (hạt giống cố định nên server và client cho cùng kết quả)
function rng(seed: number) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

function rings(seed: number, count: number, r0: number, step: number) {
  const r = rng(seed)
  const p1 = r() * 6.28
  const p2 = r() * 6.28
  const p3 = r() * 6.28
  const N = 72
  let out = ''
  for (let i = 0; i < count; i++) {
    const base = r0 + i * step
    const amp = 0.025 + i * 0.0045
    const pts: [number, number][] = []
    for (let k = 0; k < N; k++) {
      const t = (k / N) * Math.PI * 2
      const rr =
        base *
        (1 +
          amp * Math.sin(3 * t + p1 + i * 0.17) +
          amp * 0.7 * Math.sin(5 * t + p2 - i * 0.11) +
          amp * 0.5 * Math.sin(2 * t + p3 + i * 0.07))
      pts.push([Math.cos(t) * rr, Math.sin(t) * rr])
    }
    let d = ''
    for (let k = 0; k < N; k++) {
      // Catmull-Rom -> Bezier để vòng khép kín mượt
      const p0 = pts[(k - 1 + N) % N]!
      const pa = pts[k]!
      const pb = pts[(k + 1) % N]!
      const pc = pts[(k + 2) % N]!
      if (k === 0) d += `M${pa[0].toFixed(1)} ${pa[1].toFixed(1)}`
      d += ` C${(pa[0] + (pb[0] - p0[0]) / 6).toFixed(1)} ${(pa[1] + (pb[1] - p0[1]) / 6).toFixed(1)} ${(pb[0] - (pc[0] - pa[0]) / 6).toFixed(1)} ${(pb[1] - (pc[1] - pa[1]) / 6).toFixed(1)} ${pb[0].toFixed(1)} ${pb[1].toFixed(1)}`
    }
    const op = Math.max(0.14, 0.7 - i * 0.032)
    out += `<path d="${d}Z" fill="none" stroke="#C98B4E" stroke-opacity="${op.toFixed(3)}" stroke-width="1.8" vector-effect="non-scaling-stroke"/>`
  }
  return `<svg viewBox="-520 -520 1040 1040" xmlns="http://www.w3.org/2000/svg">${out}</svg>`
}

// Mỗi mục có MỘT vòng vân, đặt so le: mục này bên trái thì mục kế tiếp bên phải (side = 'l' | 'r').
// Mỗi mục một hạt giống khác nhau để hình không lặp.
export function SectionRings({ seed = 1, side = 'l' }: { seed?: number; side?: 'l' | 'r' }) {
  const svg = rings(seed * 7 + 3, 14, 30, 26)
  return (
    <div className="dz-srings" aria-hidden="true">
      <div className={`dz-sring ${side}`} dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  )
}
