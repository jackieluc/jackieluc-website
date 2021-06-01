import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  height: 100%;
  padding: 1rem 1rem 3.5rem 1rem;
  text-align: center;

  h1 {
    margin: 3rem 0;
  }
`

const WidthLayout = styled.div`
  margin: 0px auto;
  height: 100%;
  width: 100%;
  max-width: 680px;
`

const LinkWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 1rem;
  border: 2px solid var(--color-black);
`

const StyledLink = styled.a`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 1rem;
  margin: 0px;
  text-decoration: none;
  color: var(--color-accent);
  font-size: var(--font-title3-size);
  cursor: pointer;
  box-sizing: border-box;
  -webkit-transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  -moz-transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-accent);
    color: var(--color-white);
  }
`

const LinksPage = () => (
  <Layout>
    <SEO title="Jackie's Links" />
    <Container>
      <WidthLayout>
        <h1>Where to follow Jackie 😎</h1>
        <LinkWrapper>
          <StyledLink href='https://linkedin.com/in/jackieluc' target='_blank' rel='noopener noreferrer' title='LinkedIn'>LinkedIn</StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink href='https://github.com/jackieluc' target='_blank' rel='noopener noreferrer' title='Github'>Github</StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink href='https://twitter.com/jackiesthinking' target='_blank' rel='noopener noreferrer' title='Twitter'>Twitter</StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink href='https://medium.com/@jackieluc' target='_blank' rel='noopener noreferrer' title='Medium'>Medium</StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink href='http://dev.to/jackie' target='_blank' rel='noopener noreferrer' title='DEV'>DEV</StyledLink>
        </LinkWrapper>
      </WidthLayout>
    </Container>
  </Layout>
)

export default LinksPage
