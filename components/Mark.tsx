import Image from 'next/image'
import { altFor, markSize, markSrc } from '@/lib/mark-names'

type Props = {
  file: string
  /** Defaults to the mark's name. Pass "" when the mark is decorative or described nearby. */
  alt?: string
  className?: string
  style?: React.CSSProperties
  preload?: boolean
}

/** A mark, served as its own SVG file and never redrawn or recolored. */
export function Mark({ file, alt, className, style, preload }: Props) {
  const { width, height } = markSize(file)
  return <Image src={markSrc(file)} alt={alt ?? altFor(file)} width={width} height={height} className={className} style={style} preload={preload} />
}
