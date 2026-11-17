'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Hiệu ứng lướt của trang sản phẩm lớn (cùng kiểu trang About / Factory): cuộn mượt (Lenis) + chuyển động theo cuộn (GSAP).
// Không hiển thị gì. Tắt hẳn khi người dùng bật "giảm chuyển động".
export function ProductFamilyFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const root = document.querySelector('.htply-pf-page') ?? document.body
    const mm = gsap.matchMedia()

    // Bấm thanh mục nhỏ: cuộn mượt tới mục (chừa chỗ cho menu nổi và thanh mục dính)
    const onJump = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || !root.contains(a)) return
      const target = document.querySelector<HTMLElement>(a.getAttribute('href') as string)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -150, duration: 1.2 })
    }
    document.addEventListener('click', onJump)

    const ctx = gsap.context(() => {
      // 1. Tiêu đề: từng từ trượt lên từ sau tấm che
      gsap.utils.toArray<HTMLElement>('.dz-split').forEach((el) => {
        gsap.from(el.querySelectorAll('.dz-w > span'), {
          yPercent: 112, duration: 1.25, ease: 'power4.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })

      // 2. Khối nhỏ: trượt lên và hiện dần
      gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
        gsap.from(el, { y: 38, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 93%', once: true } })
      })

      // 3. Ảnh: mở ra từ dưới lên bằng đường cắt, ảnh bên trong thu nhỏ dần về cỡ thật
      gsap.utils.toArray<HTMLElement>('.pf-wipe').forEach((el) => {
        const im = el.querySelector('img')
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.4, ease: 'power3.inOut' }, 0)
        if (im) tl.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
      })

      // 4. Các thẻ loại con hiện lần lượt
      const kids = gsap.utils.toArray<HTMLElement>('.pf-kbd')
      if (kids.length) {
        gsap.from(kids, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '.pf-kids', start: 'top 85%', once: true } })
      }

      // 5. Các dòng tài liệu hiện lần lượt
      const rows = gsap.utils.toArray<HTMLElement>('.pf-row')
      if (rows.length) {
        gsap.from(rows, { y: 22, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: '.pf-rows', start: 'top 88%', once: true } })
      }

      // 6. Thanh mục nhỏ: sáng đúng mục đang xem
      const spy = gsap.utils.toArray<HTMLElement>('#pf-sub a[data-spy]')
      spy.forEach((a) => {
        const target = document.getElementById(a.dataset.spy as string)
        if (!target) return
        ScrollTrigger.create({
          trigger: target,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) spy.forEach((x) => x.classList.toggle('on', x === a))
          },
        })
      })

      // 7. Chiều sâu (chỉ màn hình rộng): ảnh chính trôi nhẹ
      mm.add('(min-width: 1021px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-par]').forEach((el) => {
          const v = Number(el.dataset.par)
          gsap.fromTo(el, { y: -v }, { y: v, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
        })
      })
    }, root as Element)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      document.removeEventListener('click', onJump)
      window.removeEventListener('load', refresh)
      mm.revert()
      ctx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
