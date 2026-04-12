import { MetadataRoute } from 'next'
import { TOOLS } from '@/lib/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://convertpro-online.vercel.app'

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `https://convertpro-online.vercel.app/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...toolPages,
  ]
}
