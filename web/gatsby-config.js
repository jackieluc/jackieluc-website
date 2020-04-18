require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const path = require('path')

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
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
          families: ['Fira Sans', 'Lora']
        }
      }
    }
  ]
}
