import { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://staff-engineer-showcase.vercel.app/sitemap.xml',
  }
}

export default robots

