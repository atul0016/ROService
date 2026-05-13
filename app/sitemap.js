export default function sitemap() {
  return [
    {
      url: 'https://smartroservicecenter.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // If you add more routes like /about, /contact in the future, add them here
    // {
    //   url: 'https://smartroservicecenter.in/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
