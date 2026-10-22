// The example images, all from the marketing site (canyon-onehouse/compass-marketing-v1,
// public/images/) except the live-site screenshots, taken 21 October 2026. The photography
// frames hold renders, Hurricane Ranch first; Aubrey Place is left out at Canyon's request.
// next/image serves each one resized and re-encoded (AVIF or WebP) for the space it fills.

import hurricaneRanch from '@/assets/images/hurricane-ranch-exterior.jpg'
import hickersonHome from '@/assets/images/hickerson-home-exterior.jpg'
import widnerResidence from '@/assets/images/widner-residence-exterior.jpg'
import harborLine from '@/assets/images/harbor-line-exterior-watercolor.jpg'
import stoneMeadow from '@/assets/images/stone-meadow-exterior-watercolor.jpg'
import studioTable from '@/assets/images/studio-drafting-table-watercolor.jpg'
import lanternHouse from '@/assets/images/home-gallery-2-watercolor.jpg'
import liveSite from '@/assets/images/live-site-home-screenshot.jpg'
import liveSitePhone from '@/assets/images/live-site-home-screenshot-phone.jpg'

export const IMAGES = {
  hurricaneRanch: { src: hurricaneRanch, file: 'hurricane-ranch-exterior.jpg', alt: 'Hurricane Ranch, a two-story board-and-batten and brick home with timber trusses, in autumn', caption: 'Hurricane Ranch · New Market · 2026' },
  hickersonHome: { src: hickersonHome, file: 'hickerson-home-exterior.jpg', alt: 'Hickerson Home, a painted-brick ranch with a carport, at golden hour', caption: 'Hickerson Home · Cullman' },
  widnerResidence: { src: widnerResidence, file: 'widner-residence-exterior.jpg', alt: 'Widner Residence, a white farmhouse with steep gables and a wraparound porch, at sunset', caption: 'Widner Residence · New Market' },
  harborLine: { src: harborLine, file: 'harbor-line-exterior-watercolor.jpg', alt: 'Harbor Line, a watercolor of a green shingled lake house with a stone chimney', caption: 'Harbor Line · Coming soon' },
  stoneMeadow: { src: stoneMeadow, file: 'stone-meadow-exterior-watercolor.jpg', alt: 'Stone Meadow, a watercolor of a cream clapboard bungalow with a deep porch', caption: 'Stone Meadow' },
  studioTable: { src: studioTable, file: 'studio-drafting-table-watercolor.jpg', alt: "A watercolor of the studio's drafting table, with plans and material samples", caption: 'The studio' },
  lanternHouse: { src: lanternHouse, file: 'home-gallery-2-watercolor.jpg', alt: 'Lantern House, a watercolor of a cream painted-brick cottage', caption: 'Lantern House · Coming soon' },
  liveSite: { src: liveSite, file: 'live-site-home-screenshot.jpg', alt: 'Screenshot of the compass-design.studio home page: a watercolor of a house with the light gold wordmark centered', caption: '' },
  liveSitePhone: { src: liveSitePhone, file: 'live-site-home-screenshot-phone.jpg', alt: 'Screenshot of the compass-design.studio home page on a phone', caption: '' },
}

export type SiteImage = (typeof IMAGES)[keyof typeof IMAGES]
