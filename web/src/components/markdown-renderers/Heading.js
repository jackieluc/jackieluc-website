import React, { PureComponent } from 'react'
import { generateSlug } from '../../lib/helpers'

import styles from '../../components/typography.module.css'

class Heading extends PureComponent {
  render () {
    const { level, children } = this.props

    let heading = null
    console.log(children[0])
    const anchorId = generateSlug(children[0].props.children)

    switch (level) {
      case 1:
        heading = <h1 id={anchorId} className={styles.responsiveTitle1}>{children}</h1>
        break
      case 2:
        heading = <h2 id={anchorId} className={styles.responsiveTitle2}>{children}</h2>
        break
      case 3:
        heading = <h3 id={anchorId} className={styles.responsiveTitle3}>{children}</h3>
        break
      case 4:
        heading = <h4 id={anchorId} className={styles.responsiveTitle4}>{children}</h4>
        break
      case 5:
        heading = <h5 id={anchorId}>{children}</h5>
        break
      case 6:
        heading = <h6 id={anchorId}>{children}</h6>
        break
    }

    return heading
  }
}

export default Heading
