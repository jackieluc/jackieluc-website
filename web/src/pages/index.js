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
      <GridLayout>
        <HeroImage bgImageSrc={data.bgImage.childImageSharp.fluid.src}>
          <StyledH1>{site.title}</StyledH1>
          <About>
            <p>Make sure you go and checkout the <Link to='/blog'>blog</Link>!</p>
          </About>
        </HeroImage>
      </GridLayout>
    </Layout>
  )
}

const StyledH1 = styled.h1`
  color: white;
  line-height: 50px;
  letter-spacing: 3px;
  height: 300px;
  text-transform: uppercase;
  writing-mode: vertical-lr;
  text-orientation: upright;
  grid-column: 2;
  grid-row: 2;
  border-right: 1px solid white;
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

  > p {
    margin: 0;
    padding: 10px;
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
