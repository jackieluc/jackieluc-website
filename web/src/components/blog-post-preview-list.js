import React from 'react'
import BlogPostPreview from './blog-post-preview'

import styles from './blog-post-preview-list.module.css'

function BlogPostPreviewGrid (props) {
  return (
    <div className={styles.root}>
      {props.title && <h1 className={styles.headline}>{props.title}</h1>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id} className={styles.blogList}>
              <BlogPostPreview {...node} isInList />
            </li>
          ))}
      </ul>
      {/* {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )} */}
    </div>
  )
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BlogPostPreviewGrid
