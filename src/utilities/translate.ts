type Target = 'FR' | 'ES'

const endpoint = () =>
  (process.env.DEEPL_API_KEY || '').endsWith(':fx')
    ? 'https://api-free.deepl.com/v2/translate'
    : 'https://api.deepl.com/v2/translate'

/**
 * Dịch một mảng chữ từ tiếng Anh sang FR/ES bằng DeepL, giữ nguyên thứ tự.
 * Chia lô 40 chữ mỗi lần gọi. Chữ rỗng được giữ nguyên, không gửi đi.
 */
export async function translateTexts(texts: string[], target: Target): Promise<string[]> {
  const key = process.env.DEEPL_API_KEY
  if (!key) throw new Error('Missing DEEPL_API_KEY')

  const result: string[] = texts.map((t) => t)
  const indexes = texts.map((t, i) => (t && t.trim() ? i : -1)).filter((i) => i >= 0)

  for (let i = 0; i < indexes.length; i += 40) {
    const slice = indexes.slice(i, i + 40)
    const res = await fetch(endpoint(), {
      method: 'POST',
      headers: { Authorization: `DeepL-Auth-Key ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: slice.map((idx) => texts[idx]),
        source_lang: 'EN',
        target_lang: target,
      }),
    })
    if (!res.ok) throw new Error(`DeepL ${res.status}: ${await res.text()}`)
    const data = (await res.json()) as { translations: { text: string }[] }
    slice.forEach((idx, k) => {
      result[idx] = data.translations[k].text
    })
  }
  return result
}

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
  root?: LexicalNode
  [key: string]: unknown
}

/**
 * Dịch nội dung soạn thảo (Lexical): chỉ dịch các đoạn chữ (node "text"),
 * giữ nguyên toàn bộ định dạng, link, ảnh, bảng và các khối đặc biệt.
 * `translate` có thể được thay (dùng khi kiểm thử).
 */
export async function translateLexical<T>(
  root: T,
  target: Target,
  translate: (texts: string[], target: Target) => Promise<string[]> = translateTexts,
): Promise<T> {
  const copy = JSON.parse(JSON.stringify(root)) as LexicalNode
  const nodes: LexicalNode[] = []

  const walk = (n: LexicalNode | undefined) => {
    if (!n || typeof n !== 'object') return
    if (n.type === 'text' && typeof n.text === 'string' && n.text.trim()) nodes.push(n)
    if (Array.isArray(n.children)) n.children.forEach(walk)
    if (n.root) walk(n.root)
  }
  walk(copy)

  if (nodes.length === 0) return copy as T
  const translated = await translate(nodes.map((n) => n.text as string), target)
  nodes.forEach((n, i) => {
    n.text = translated[i]
  })
  return copy as T
}

/**
 * Dịch tiêu đề, tóm tắt và nội dung bài trong MỘT lần gọi DeepL (nhanh hơn gọi nhiều lần).
 * Chữ rỗng được giữ nguyên.
 */
export async function translateDoc<T>(
  input: { title: string; excerpt: string; content: T },
  target: Target,
): Promise<{ title: string; excerpt: string; content: T }> {
  const content = input.content ? (JSON.parse(JSON.stringify(input.content)) as LexicalNode) : null
  const nodes: LexicalNode[] = []
  const walk = (n: LexicalNode | undefined | null) => {
    if (!n || typeof n !== 'object') return
    if (n.type === 'text' && typeof n.text === 'string' && n.text.trim()) nodes.push(n)
    if (Array.isArray(n.children)) n.children.forEach(walk)
    if (n.root) walk(n.root)
  }
  walk(content)

  const texts = [input.title || '', input.excerpt || '', ...nodes.map((n) => n.text as string)]
  const out = await translateTexts(texts, target)
  nodes.forEach((n, i) => {
    n.text = out[i + 2]
  })
  return { title: out[0], excerpt: out[1], content: (content ?? input.content) as T }
}
