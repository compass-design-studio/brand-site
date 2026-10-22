// Site copy: section names and short page text that isn't a brand rule. Brand wording comes
// from content/brand.ts (the design system).

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brand.compass-design.studio'

export type SectionId = 'logos' | 'rules' | 'color' | 'type' | 'voice' | 'icons' | 'imagery' | 'insitu'

/** The numbered sections, in page order. Spacing sits in an unnumbered drawer after Iconography. */
export const SECTIONS: { id: SectionId; name: string; nav: string }[] = [
  { id: 'logos', name: 'Logo files', nav: 'Logo files' },
  { id: 'rules', name: 'Using the marks', nav: 'Usage' },
  { id: 'color', name: 'Color', nav: 'Color' },
  { id: 'type', name: 'Typography & fonts', nav: 'Type' },
  { id: 'voice', name: 'Voice & copy', nav: 'Voice' },
  { id: 'icons', name: 'Iconography', nav: 'Icons' },
  { id: 'imagery', name: 'Imagery', nav: 'Imagery' },
  { id: 'insitu', name: 'In situ', nav: 'In situ' },
]

export function sectionNumber(id: SectionId): string {
  return String(SECTIONS.findIndex((s) => s.id === id) + 1).padStart(2, '0')
}

export const STUDIO_META = 'Compass Design Studio · Northern Alabama'

export const HERO = {
  kicker: 'Brand resources',
  title: "Everything you need to put the studio's name on something.",
  lead: "Logos, colors, type and the rules for using them, for the studio's staff, contractors and trade partners.",
}

export const REQUEST_COPY = {
  topBar: 'Request a file',
  closeEyebrow: 'Requests',
  closeTitle: "Need a file that isn't here?",
  closeBody: 'A missing format, a correction, or a question about using a mark. It goes to Allison and Canyon.',
  closeButton: "Tell us what's missing",
  dialogEyebrow: 'Brand resources · requests',
  dialogIntro: 'It goes to Allison and Canyon. We reply within the week.',
  trust: 'No newsletter, no spam — just a reply from the studio.',
}
