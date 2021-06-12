require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const path = require('path')
const PortableText = require('@sanity/block-content-to-html')
const Marked = require('marked')

const clientConfig = require('./client-config')

const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'
const siteUrl = 'https://www.jackieluc.com'

// Helper functions for Portable Text from ./src/lib/helpers.js
const { isFuture, parseISO } = require('date-fns')

function filterOutDocsPublishedInTheFuture ({ publishedAt }) {
  return !isFuture(parseISO(publishedAt))
}

function getBlogUrl (slug) {
  return `/blog/${slug.current || slug}/`
}

const config = {
  siteMetadata: {
    title: 'Jackie Luc',
    description: 'Embark on a life-long journey to grow your career in software development and create great web experiences with me.',
    author: 'Jackie Luc',
    siteUrl: siteUrl
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-plausible',
      options: {
        domain: 'jackieluc.com'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jackie Luc',
        short_name: 'Jackie Luc',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#6C70AD',
        display: 'minimal-ui',
        icon: 'src/assets/icons/favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-react-helmet-canonical-urls',
      options: {
        siteUrl: 'https://www.jackieluc.com'
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp', // Needed for dynamic images
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
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allSanityPost } }) => {
              return allSanityPost.edges
                .filter(({ node }) => filterOutDocsPublishedInTheFuture(node))
                .filter(({ node }) => node.slug)
                .map(({ node }) => {
                  const { title, slug, publishedAt, tags, _rawExcerpt, body } = node
                  const url = site.siteMetadata.siteUrl + getBlogUrl(slug.current)

                  return {
                    title,
                    date: publishedAt,
                    url,
                    guid: url,
                    description: PortableText({ blocks: _rawExcerpt }),
                    categories: tags.map(tag => tag.title),
                    custom_elements: [
                      {
                        'content:encoded': Marked(body)
                      }
                    ]
                  }
                })
            },
            query: `
              {
                allSanityPost(sort: {fields: publishedAt, order: DESC}) {
                  edges {
                    node {
                      title
                      slug {
                        current
                      }
                      publishedAt
                      tags {
                        title
                      }
                      _rawExcerpt
                      body
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Jackie Luc\'s Blog Website'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap/sitemap-0.xml`,
        resolveEnv: () => NODE_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          },
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          }
        }
      }
    }
  ]
}

module.exports = config
