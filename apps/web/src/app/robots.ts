import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/', '/_next/'],
      },
    ],
    sitemap: 'https://ech-st.com/sitemap.xml',
    host: 'https://ech-st.com',
  }
}