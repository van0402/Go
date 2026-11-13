// Tiêu đề tách từng từ để hiệu ứng trượt lên từ sau tấm che (xem Dreamy.tsx). Tách bằng React, không sửa DOM bằng tay.
export function SplitTitle({
  text,
  as: Tag = 'h2',
  className = '',
}: {
  text: string
  as?: 'h2' | 'h3'
  className?: string
}) {
  const words = text.split(' ').filter(Boolean)
  return (
    <Tag className={`dz-title dz-split ${className}`.trim()} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="dz-w">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
