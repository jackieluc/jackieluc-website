import React from 'react'
import { graphql, Link } from 'gatsby'
// import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
// import Image from 'gatsby-image'
import styled from 'styled-components'

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
      <HeroImage bgImageSrc={data.bgImage.childImageSharp.fluid.src}>
        <h1>Welcome to {site.title}'s website</h1>
        <div>
          <p>Make sure you go and checkout the <Link to='/blog'>blog</Link>!</p>
        </div>
      </HeroImage>
    </Layout>
  )
}

const HeroImage = styled.main`
  min-height: 100vh;
  background-image: url(${props => props.bgImageSrc});
  background-size: cover;
  background-position: center;
`

export default IndexPage
