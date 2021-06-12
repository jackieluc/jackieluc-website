import React from 'react'
import Header from './header'

import '../styles/layout.css'
import * as styles from './layout.module.css'

const Layout = ({ children, siteTitle, page }) => (
  <div className={page === 'blog-post' ? styles.blogPostLayoutGrid : null}>
    <Header siteTitle={siteTitle} />
    <main className={styles.content}>
      {children}
    </main>
  </div>
)

export default Layout
