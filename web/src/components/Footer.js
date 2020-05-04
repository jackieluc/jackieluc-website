import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;

  a {
    color: inherit;
    text-decoration: none;

    @media (hover: hover) {
      &:hover {
        color: var(--color-accent);
      }
    }
  }

  .footerWrapper {
    box-sizing: border-box;
    max-width: 960px;
    margin: 4rem auto;
    padding-bottom: 3rem;

    @media(min-width: 450px) {
      padding-bottom: unset;
    }
  }
`

const Footer = () => (
  <StyledFooter>
    <div className='footerWrapper'>
      <div>
        &copy; {new Date().getFullYear()}, Jackie Luc. Built with <a href='https://www.gatsbyjs.org' target='_blank'>Gatsby</a>{' '}
        &amp;
        {` `}
        <a href='https://www.sanity.io' target='_blank'>Sanity</a>
      </div>
    </div>
  </StyledFooter>
)

export default Footer
