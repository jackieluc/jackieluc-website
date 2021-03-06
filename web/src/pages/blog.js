import React from 'react'
import { graphql } from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewList from '../components/blog-post-preview-list'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Footer from '../components/Footer'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query BlogPreviewPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          tags {
            _id
            title
          }
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          body # This is needed in the preview so that we can calculate read time
          slug {
            current
          }
        }
      }
    }
  }
`

const BlogPreviewPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const blogTitle = 'Latest thoughts'
  const blogDescription = `Latest thoughts for software developers and people looking to grow their careers.`

  return (
    <Layout page='blog-post'>
      <SEO
        title={blogTitle}
        description={blogDescription}
        keywords={site.keywords}
      />
      <Container>
        {postNodes && (
          <BlogPostPreviewList
            title={blogTitle}
            nodes={postNodes}
          />
        )}
      </Container>
      <Footer />
    </Layout>
  )
}

export default BlogPreviewPage
