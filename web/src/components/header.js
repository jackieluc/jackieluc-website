import { Link } from 'gatsby'
import React from 'react'
// import Icon from './icon'
// import { cn } from '../lib/helpers'

import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      {/* <div className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </div> */}

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to='/' activeClassName={styles.active}>About</Link>
          </li>
          <li>
            <Link to='/blog/' activeClassName={styles.active} partiallyActive>Blog</Link>
          </li>
          {/* <li>
            <a href='https://github.com/jackieluc'>Gtihub</a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/jackieluc/'>LinkedIn</a>
          </li> */}
          {/* <li>
            <Link to='/archive/' activeClassName={styles.active}>Archive</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  </div>
)

export default Header
