import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

// No lastModified: search engines want the date the content really changed, not the build date.
// Client pages such as /testimonial stay out on purpose: they're unlisted (ADR 0005).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/` }]
}
