// "Check it where it's weakest": measures, at build time, the lowest contrast between a mark's
// color and the photo pixels under the mark's box. The pictures that use it have a fixed aspect
// ratio and object-position, so the box covers the same part of the photo at every width.

import path from 'node:path'
import sharp from 'sharp'
import { contrastRatio } from '@/lib/contrast'

export type PhotoPlacement = {
  /** Path under assets/images. */
  image: string
  /** Frame width / height. */
  aspect: number
  /** CSS object-position as fractions, e.g. [0.5, 0]. */
  position: [number, number]
  /** The mark's box as fractions of the frame. */
  box: { left: number; top: number; width: number; height: number }
}

export async function weakestOnPhoto(p: PhotoPlacement, markHex: string): Promise<number | null> {
  try {
    const file = path.join(process.cwd(), 'assets', 'images', p.image)
    const { width: W = 0, height: H = 0 } = await sharp(file).metadata()
    // Frame in units where its width is 1; the image covers it (object-fit: cover).
    const fw = 1
    const fh = 1 / p.aspect
    const s = Math.max(fw / W, fh / H)
    const ox = (fw - W * s) * p.position[0]
    const oy = (fh - H * s) * p.position[1]
    const left = Math.max(0, Math.round((p.box.left * fw - ox) / s))
    const top = Math.max(0, Math.round((p.box.top * fh - oy) / s))
    const width = Math.min(W - left, Math.round((p.box.width * fw) / s))
    const height = Math.min(H - top, Math.round((p.box.height * fh) / s))
    const { data, info } = await sharp(file).extract({ left, top, width, height }).resize(64, 24, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
    let worst = Infinity
    for (let i = 0; i < data.length; i += info.channels) {
      const hex = '#' + [data[i], data[i + 1], data[i + 2]].map((v) => v.toString(16).padStart(2, '0')).join('')
      worst = Math.min(worst, contrastRatio(markHex, hex))
    }
    return worst
  } catch (err) {
    console.warn('Photo contrast check skipped', p.image, err)
    return null
  }
}
