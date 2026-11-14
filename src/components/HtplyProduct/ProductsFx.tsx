'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Hiệu ứng lướt của trang Products: cuộn mượt (Lenis) + chuyển động gắn với vị trí cuộn (GSAP ScrollTrigger).
// Không hiển thị gì. Tắt hẳn khi người dùng bật "giảm chuyển động".
// Chia hai phần: phần cố định (đầu trang, dải Picton) chạy một lần; phần danh sách dựng lại mỗi khi đổi bộ lọc / kiểu hiển thị
// (vì khi đó các hàng/thẻ được React dựng lại). `listKey` đổi => dựng lại phần danh sách.
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ProductsFx({ listKey }: { listKey: string }) {
  // Phần cố định
  useEffect(() => {
    if (reduced()) return
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const root = document.querySelector('.htply-products-page') ?? document.body
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ps-hero .ps-split, .ps-help .ps-split').forEach((el, i) => {
        gsap.from(el.querySelectorAll('.ps-w > span'), {
          yPercent: 115, duration: 1.25, ease: 'power4.out', stagger: 0.07, delay: i === 0 ? 0.2 : 0,
          scrollTrigger: i === 0 ? undefined : { trigger: el, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.ps-hero [data-fade], .ps-help [data-fade]').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      })
      // Chồng ván tách lớp theo cuộn ở đầu trang
      const deco = document.querySelector<HTMLElement>('.ps-deco')
      if (deco) {
        ScrollTrigger.create({
          trigger: '.ps-hero', start: 'top top', end: 'bottom top', scrub: true,
          onUpdate: (s) => deco.style.setProperty('--gap', (12 + s.progress * 34).toFixed(1)),
        })
      }
    }, root as Element)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  // Phần danh sách: dựng lại khi đổi bộ lọc hoặc kiểu hiển thị
  useEffect(() => {
    if (reduced()) return
    gsap.registerPlugin(ScrollTrigger)

    const root = document.querySelector('.htply-products-page') ?? document.body
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ps-list .ps-split').forEach((el) => {
        gsap.from(el.querySelectorAll('.ps-w > span'), {
          yPercent: 115, duration: 1.25, ease: 'power4.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.ps-list [data-fade]').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      })
      // Dải thẻ vuông loại con: lần lượt hiện lên (clearProps để hover bằng CSS còn hoạt động)
      gsap.utils.toArray<HTMLElement>('.ps-list .ps-kids').forEach((k) => {
        gsap.from(k.querySelectorAll('.ps-kids-h, .ps-kid'), {
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, clearProps: 'transform,opacity',
          scrollTrigger: { trigger: k, start: 'top 90%', once: true },
        })
      })
      // Ảnh: mở ra từ dưới lên bằng đường cắt, ảnh bên trong thu nhỏ dần về cỡ thật
      gsap.utils.toArray<HTMLElement>('.ps-list .ps-wipe').forEach((el) => {
        const im = el.querySelector('img')
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 30px)' }, { clipPath: 'inset(0% 0% 0% 0% round 30px)', duration: 1.5, ease: 'power3.inOut' }, 0)
        if (im) tl.fromTo(im, { scale: 1.35 }, { scale: 1, duration: 1.9, ease: 'power3.out' }, 0)
      })
      // Chiều sâu: ảnh, khung, số lớn trôi lệch tốc độ (chỉ trên màn hình rộng)
      mm.add('(min-width: 1021px)', () => {
        gsap.utils.toArray<HTMLElement>('.ps-list .ps-frame img').forEach((im) => {
          gsap.fromTo(im, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
        })
        gsap.utils.toArray<HTMLElement>('.ps-list .ps-vis').forEach((v) => {
          gsap.fromTo(v, { y: 34 }, { y: -34, ease: 'none', scrollTrigger: { trigger: v, start: 'top bottom', end: 'bottom top', scrub: 1.3 } })
        })
        gsap.utils.toArray<HTMLElement>('.ps-list .ps-big').forEach((b) => {
          gsap.fromTo(b, { y: 60 }, { y: -60, ease: 'none', scrollTrigger: { trigger: b.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 } })
        })
      })
    }, root as Element)
    ScrollTrigger.refresh()

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [listKey])

  return null
}
