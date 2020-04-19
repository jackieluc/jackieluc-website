import React from 'react'
import { graphql, Link } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styled from 'styled-components'
import BlogPostPreview from '../components/blog-post-preview'

import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    # relativePath is relative to the path provided in gatsby-config.js
    bgImage: file(relativePath: { eq: "index-page-bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    featuredBlog: allSanityPost(
      limit: 5
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

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).featuredBlog
    ? mapEdgesToNodes(data.featuredBlog)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <GridLayout>
        <HeroImage bgImageSrc={data.bgImage.childImageSharp.fluid.src}>
          <StyledH1>{site.title}</StyledH1>
          <About>
            <h2>Featured Blog</h2>
            <FeaturedBlogWrapper>
              {postNodes && (
                <BlogPostPreview {...postNodes[0]} isInList />
              )}
            </FeaturedBlogWrapper>
          </About>
        </HeroImage>
      </GridLayout>
    </Layout>
  )
}

const StyledH1 = styled.h1`
  color: white;
  line-height: 50px;
  letter-spacing: 10px;
  height: 100%;
  text-transform: uppercase;
  writing-mode: vertical-lr;
  text-orientation: upright;
  grid-column: 2;
  grid-row: 2;
  border-right: 1px solid white;

  @media (min-width: 720px) {
    height: 400px;
  }
`

const GridLayout = styled.div`
  height: 100vh;
  @media (min-width: 720px) {
    display: grid;
    grid-template-columns: 80px auto 80px;
    grid-template-rows: 80px auto 80px;
  }
`

const About = styled.div`
  grid-column: 3;
  grid-row: 2;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h2 {
    margin: 0;
    margin-bottom: 1rem;
  }

  > p {
    margin: 0;
    padding: 10px;
  }
`

const FeaturedBlogWrapper = styled.div`
  max-width: 600px;
  border: #ffffff solid 1px;
  padding: 5px;
  border-radius: 4px;
  
  -webkit-transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
  -moz-transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;

  &:hover {
    background-color: #ffffff;
    color: #36313d;
  }
`

const HeroImage = styled.div`
  height: 100vh;
  background-image: url(${props => props.bgImageSrc});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: grid;
  grid-template-columns: 1fr auto auto 1fr;
  grid-template-rows: 1fr auto auto 1fr;
  grid-gap: 20px;
  
  @media (min-width: 720px) {
    height: unset;
    grid-column: 2/2;
    grid-row: 2/2;
  }

  /*
    Reset margins and paddings on index page
  */
  > * {
    margin: 0;
    padding: 0;
  }
`

export default IndexPage
