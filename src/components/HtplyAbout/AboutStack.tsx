// Chồng 8 lớp ván ép xếp isometric, đặt ở mép trái hoặc phải của một mục.
// Vân gỗ các lớp xen kẽ ngang/dọc (như ván ép thật); lớp trên cùng viền Picton. Chuyển động nằm trong AboutFx.tsx.
export function AboutStack({ side = 'r' }: { side?: 'l' | 'r' }) {
  const layers = Array.from({ length: 8 }, (_, i) => i)
  return (
    <div className="ad-srings" aria-hidden="true">
      <div className={`ad-sring ${side}`}>
        <div className="ad-plane">
          {layers.map((i) => (
            <i
              key={i}
              className={`ad-lay ${i % 2 ? 'g2' : 'g1'}${i === 7 ? ' top' : ''}`}
              style={{ ['--i' as string]: i, ['--k' as string]: (i / 7).toFixed(2) }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
