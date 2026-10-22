import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

// No lastModified: search engines want the date the content really changed, not the build date.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/` }]
}
