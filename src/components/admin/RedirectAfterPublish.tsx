'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useConfig, useDocumentEvents, useDocumentInfo } from '@payloadcms/ui'

/**
 * Sau khi bấm Publish (hoặc Publish changes) thành công, tự quay về trang danh sách của mục đó.
 * Không hiện gì trên giao diện. Bản nháp tự lưu (autosave) không kích hoạt việc chuyển trang.
 */
const handled = new Set<string>()

export default function RedirectAfterPublish() {
  const router = useRouter()
  const { config } = useConfig()
  const { collectionSlug } = useDocumentInfo()
  const { mostRecentUpdate } = useDocumentEvents()
  const initial = useRef(mostRecentUpdate)

  useEffect(() => {
    const ev = mostRecentUpdate
    if (!ev || !collectionSlug) return
    if (ev.entitySlug !== collectionSlug || ev.drawerSlug) return
    const doc = ev.doc as { _status?: string } | undefined
    if (doc?._status !== 'published') return

    // Với bài mới tạo: Payload chuyển sang trang sửa rồi mới gắn component này,
    // nên chấp nhận sự kiện "create" có sẵn lúc vừa gắn. Với các sự kiện còn lại chỉ nhận khi nó mới xuất hiện.
    const isNewSinceMount = ev !== initial.current
    const isFreshCreate = ev.operation === 'create'
    if (!isNewSinceMount && !isFreshCreate) return

    const key = `${collectionSlug}:${ev.id ?? ''}:${ev.updatedAt ?? ''}`
    if (handled.has(key)) return
    handled.add(key)

    setTimeout(() => {
      router.push(`${config.routes.admin}/collections/${collectionSlug}`)
    }, 700) // chờ một chút để thông báo "Updated successfully" kịp hiện
  }, [mostRecentUpdate, collectionSlug, config.routes.admin, router])

  return null
}
