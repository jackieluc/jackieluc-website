/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jackieluc.com',
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/404', '/api'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      {
        userAgent: '*',
        disallow: ['/404', '/api'],
      },
    ],
    additionalSitemaps: ['https://jackieluc.com/sitemap.xml'],
  },
};
