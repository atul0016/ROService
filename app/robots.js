export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Hide admin folder from search engines
    },
    sitemap: 'https://smartroservicecenter.in/sitemap.xml',
  }
}
