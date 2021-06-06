import React from 'react'
import Img from 'gatsby-image'

export default ({ node }) => {
  if (!node || !node.asset || !node.asset._id) { return null }

  return (
    <figure>
      <Img alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  )
}
