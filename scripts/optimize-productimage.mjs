import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('public/productimage')
const outputDir = path.resolve('public/images/productimage')

fs.mkdirSync(outputDir, { recursive: true })

const files = fs.readdirSync(inputDir)

for (const file of files) {
  const ext = path.extname(file).toLowerCase()

  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

  const input = path.join(inputDir, file)
  const name = path.parse(file).name
  const output = path.join(outputDir, `${name}.webp`)

  await sharp(input)
    .rotate()
    .resize({
      width: 1920,
      withoutEnlargement: true,
    })
    .webp({
      quality: 85,
      effort: 5,
    })
    .toFile(output)

  console.log(`✓ ${file} -> ${name}.webp`)
}

console.log('Done')