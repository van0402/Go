// Chồng 8 lớp ván ép xếp isometric, đặt ở mép trái hoặc phải của một mục (thay cho vòng vân cũ).
// Vân gỗ các lớp xen kẽ ngang/dọc (như ván ép thật); lớp trên cùng viền Picton. Chuyển động nằm trong Dreamy.tsx.
export function SectionStack({ side = 'r' }: { side?: 'l' | 'r' }) {
  const layers = Array.from({ length: 8 }, (_, i) => i)
  return (
    <div className="dz-srings" aria-hidden="true">
      <div className={`dz-sring ${side}`}>
        <div className="dz-plane">
          {layers.map((i) => (
            <i
              key={i}
              className={`dz-lay ${i % 2 ? 'g2' : 'g1'}${i === 7 ? ' top' : ''}`}
              style={{ ['--i' as string]: i, ['--k' as string]: (i / 7).toFixed(2) }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
