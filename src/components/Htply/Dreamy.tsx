'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Điều khiển hiệu ứng lướt của trang Home: cuộn mượt có quán tính (Lenis) + chuyển động gắn với vị trí cuộn (GSAP ScrollTrigger).
// Không hiển thị gì; chỉ gắn hiệu ứng vào các phần tử có class dz-* / data-*. Tắt hẳn khi người dùng bật "giảm chuyển động".
export function Dreamy() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const root = document.querySelector('.htply-page') ?? document.body
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // 1. Nền: mỗi mục có một chồng ván ép; các lớp tách ra khi mục đi ngang giữa màn hình rồi khép lại, chồng xoay nhẹ
      gsap.utils.toArray<HTMLElement>('.dz-srings').forEach((box) => {
        const wrap = box.querySelector<HTMLElement>('.dz-sring')
        const plane = box.querySelector<HTMLElement>('.dz-plane')
        if (!wrap || !plane) return
        const left = wrap.classList.contains('l')
        const st = { trigger: box.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.4 }
        gsap
          .timeline({ scrollTrigger: st })
          .fromTo(plane, { '--gap': 6, '--rz': left ? -44 : 44 }, { '--gap': 52, '--rz': left ? -30 : 30, ease: 'none', duration: 1 })
          .to(plane, { '--gap': 8, '--rz': left ? -18 : 18, ease: 'none', duration: 1 })
        gsap.fromTo(wrap, { yPercent: left ? -5 : 6 }, { yPercent: left ? 7 : -7, ease: 'none', scrollTrigger: st })
      })

      // 2. Banner: ảnh trôi chậm hơn trang, chữ nâng lên và mờ dần
      gsap.to('.hero .hero-bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero .hero-grid', { y: -90, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '12% top', end: '78% top', scrub: true } })

      // 3. Tiêu đề: từng từ trượt lên từ sau tấm che
      gsap.utils.toArray<HTMLElement>('.dz-split').forEach((el) => {
        gsap.from(el.querySelectorAll('.dz-w > span'), {
          yPercent: 112, duration: 1.25, ease: 'power4.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })

      // 4. Khối nhỏ: trượt lên và hiện dần
      gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
        gsap.from(el, { y: 38, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
      gsap.from('[data-row]', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.dz-rows', start: 'top 88%', once: true } })

      // 5. Ảnh: mở ra từ dưới lên bằng đường cắt, ảnh bên trong thu nhỏ dần về cỡ thật
      gsap.utils.toArray<HTMLElement>('.dz-wipe').forEach((el) => {
        const im = el.querySelector('img')
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 26px)' }, { clipPath: 'inset(0% 0% 0% 0% round 26px)', duration: 1.5, ease: 'power3.inOut' }, 0)
        if (im && !el.classList.contains('dz-vstage')) tl.fromTo(im, { scale: 1.35 }, { scale: 1, duration: 1.9, ease: 'power3.out' }, 0)
      })

      // 6. Chiều sâu: các thành phần trôi lệch tốc độ (chỉ trên màn hình rộng)
      mm.add('(min-width: 1021px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-par]').forEach((el) => {
          const v = Number(el.dataset.par)
          gsap.fromTo(el, { y: -v }, { y: v, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
        })
        gsap.utils.toArray<HTMLElement>('[data-par-card]').forEach((el) => {
          const v = Number(el.dataset.parCard)
          gsap.fromTo(el, { y: v }, { y: -v, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.4 } })
        })
        gsap.fromTo('.dz-main img', { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.dz-vis', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
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
