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
    padding: 4.5em 1.5em 1.5em;
    margin: 0 auto 3.5rem;
  }
`

const Footer = () => (
  <StyledFooter>
    <div className='footerWrapper'>
      <div>
        &copy; {new Date().getFullYear()}, Jackie Luc. Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
        &amp;
        {` `}
        <a href='https://www.gatsbyjs.org'>Gatsby</a>
      </div>
    </div>
  </StyledFooter>
)

export default Footer
