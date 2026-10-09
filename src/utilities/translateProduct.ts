import { translateTexts } from './translate'

type Ref = { o: any; k: string | number }

export async function translateProductData<T>(src: T, target: 'FR' | 'ES'): Promise<T> {
  const copy = JSON.parse(JSON.stringify(src))
  const refs: Ref[] = []

  const walk = (o: any) => {
    if (Array.isArray(o)) {
      o.forEach((v, i) => (typeof v === 'string' ? refs.push({ o, k: i }) : walk(v)))
    } else if (o && typeof o === 'object') {
      for (const k of Object.keys(o)) {
        if (k === 'id' || k === 'key') continue // mã, không dịch
        const v = o[k]
        typeof v === 'string' ? refs.push({ o, k }) : walk(v)
      }
    }
  }
  walk(copy)

  const out = await translateTexts(refs.map((r) => r.o[r.k] as string), target)
  refs.forEach((r, i) => {
    r.o[r.k] = out[i]
  })
  return copy as T
}