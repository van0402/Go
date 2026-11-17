'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Hiệu ứng lướt của trang Factory (cùng kiểu trang About): cuộn mượt (Lenis) + chuyển động gắn với vị trí cuộn (GSAP).
// Không hiển thị gì; gắn vào các phần tử class ft-* / dz-split / data-*. Tắt hẳn khi người dùng bật "giảm chuyển động".
export function FactoryFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const root = document.querySelector('.htply-factory-page') ?? document.body
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // 1. Banner: ảnh trôi chậm hơn trang, chữ nâng lên và mờ dần
      gsap.to('.ft-hero-bgw', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.ft-hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.ft-hero-in', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.ft-hero', start: '12% top', end: '78% top', scrub: true } })

      // 2. Tiêu đề: từng từ trượt lên từ sau tấm che
      gsap.utils.toArray<HTMLElement>('.dz-split').forEach((el) => {
        gsap.from(el.querySelectorAll('.dz-w > span'), {
          yPercent: 112, duration: 1.25, ease: 'power4.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      // 3. Khối nhỏ: trượt lên và hiện dần
      gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
        gsap.from(el, { y: 38, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      })

      // 4. Ảnh: mở ra từ một bên bằng đường cắt, ảnh bên trong thu nhỏ dần về cỡ thật
      gsap.utils.toArray<HTMLElement>('.ft-wipe').forEach((el) => {
        const im = el.querySelector('img')
        const fromRight = el.classList.contains('r')
        const from = fromRight ? 'inset(0% 0% 0% 100% round 22px)' : 'inset(0% 100% 0% 0% round 22px)'
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
        tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.5, ease: 'power3.inOut' }, 0)
        if (im) tl.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: 'power3.out' }, 0)
      })

      // 5. Chiều sâu + video phóng to dần (chỉ trên màn hình rộng)
      mm.add('(min-width: 901px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-par]').forEach((el) => {
          const v = Number(el.dataset.par)
          gsap.fromTo(el, { y: -v }, { y: v, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
        })
        gsap.fromTo(
          '.ft-vframe',
          { scale: 0.84, borderRadius: 28 },
          { scale: 1, borderRadius: 10, ease: 'none', scrollTrigger: { trigger: '.ft-vstage', start: 'top 95%', end: 'top 30%', scrub: 0.8 } },
        )
      })
    }, root as Element)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
      ctx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
