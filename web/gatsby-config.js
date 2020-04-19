require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const path = require('path')

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  siteMetadata: {
    title: `Jackie Luc`,
    description: `Jackie Luc is a software developer on a life-long journey to learn how to create better web experiences.`,
    author: `jackieluc`,
    siteUrl: `https://www.jackieluc.com`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jackie Luc`,
        short_name: `Jackie Luc`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#6C70AD`,
        display: `minimal-ui`,
        icon: `src/assets/icons/favicon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.jackieluc.com`
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'assets', 'images')
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          // exclude this path to enable url-loader on the path
          // svg-react-loader is used everywhere else
          exclude: /assets\/icons/
        }
      }
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Fira Sans', 'Lora&display=swap'] // https://github.com/typekit/webfontloader/issues/409#issuecomment-529248148
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/tags/*'],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.edges
            .filter(({ node }) => (
              node.path.match(/^\/blog\/[a-zA-Z0-9\/\-]+/gi)
            ))
            .map(({ node }) => {
              return {
                url: site.siteMetadata.siteUrl + node.path,
                changefreq: 'daily',
                priority: 0.7
              }
            })
            .concat(
              {
                url: site.siteMetadata.siteUrl + '/',
                changeFreq: 'daily',
                priority: 0.5
              },
              {
                url: site.siteMetadata.siteUrl + '/blog/',
                changeFreq: 'daily',
                priority: 0.5
              }
            )
        }
      }
    }
  ]
}

// Set Google Analytics in 'production' mode
if (isProd) {
  config.plugins.push(
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-105322505-1',
        head: true,
        respectDNT: true,
        siteSpeedSampleRate: 10, // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#siteSpeedSampleRate
        cookieDomain: 'jackieluc.com'
      }
    }
  )
}

module.exports = config
