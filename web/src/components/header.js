import { Link } from 'gatsby'
import React from 'react'
import { createGlobalStyle } from 'styled-components'

import styles from './header.module.css'
import externalLinkIcon from '../assets/icons/external-link.svg'
// import Icon from './icon'
// import { cn } from '../lib/helpers'

const GlobalStyle = createGlobalStyle`
  :root {
    --font-family-sans: 'Fira Sans', 'Lora', -apple-system, BlinkMacSystemFont, sans-serif;

    --color-black: #36313d;
    --color-dark-gray: #32373e;
    --color-gray: #697a90;
    --color-light-gray: #b4bcc7;
    --color-very-light-gray: #e7ebed;
    --color-white: #fff;
    --color-accent: #6C70AD;

    /* Typography */
    --unit: 16;
    --font-micro-size: calc(10 / var(--unit) * 1rem); /* 10px */
    --font-micro-line-height: calc(12 / 10); /* 12px */
    --font-small-size: calc(14 / var(--unit) * 1rem); /* 14px */
    --font-small-line-height: calc(21 / 14); /* 21px */
    --font-base-size: 1em; /* 16px */
    --font-base-line-height: calc(24 / var(--unit)); /* 24px */
    --font-large-size: calc(18 / var(--unit) * 1rem); /* 18px */
    --font-large-line-height: calc(27 / 18); /* 27px */

    --font-title3-size: calc(21 / var(--unit) * 1rem); /* 21px */
    --font-title3-line-height: calc(30 / 21); /* 30px */
    --font-title2-size: calc(24 / var(--unit) * 1rem); /* 24px */
    --font-title2-line-height: calc(33 / 24); /* 33px */
    --font-title1-size: calc(49 / var(--unit) * 1rem); /* 49px */
    --font-title1-line-height: calc(57 / 49); /* 57px */
  }

  /* Add external link icon */
  a[target="_blank"]::after {
    content: url(${externalLinkIcon});
    display: inline-block;
    margin-left: 0.2em;
    width: 1em;
    height: 1em;
  }

  /* Add 'open new tab' text for screen readers only for external links */
  .screen-reader-only {
    position: absolute;
    width: 1px;
    clip: rect(0 0 0 0);
    overflow: hidden;
    white-space: nowrap;
  }
`

const Header = ({ siteTitle }) => (
  <>
    <GlobalStyle />
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {/* <div className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </div> */}

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to='/' activeClassName={styles.active}>Home</Link>
            </li>
            <li>
              <Link to='/blog/' activeClassName={styles.active} partiallyActive>Blog</Link>
            </li>
            <li>
              <Link to='/links/' activeClassName={styles.active} partiallyActive>Links</Link>
            </li>
            {/* <li>
            <Link to='/archive/' activeClassName={styles.active}>Archive</Link>
          </li> */}
          </ul>
        </nav>
      </div>
    </div>
  </>
)

export default Header
