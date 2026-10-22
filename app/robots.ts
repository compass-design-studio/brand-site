import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

// Keeps crawlers off the request form's token endpoint and points them to the sitemap.
// The logo files stay crawlable so they can show in image search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
