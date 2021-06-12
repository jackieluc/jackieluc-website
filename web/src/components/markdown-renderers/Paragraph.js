import React, { PureComponent } from 'react'
import * as styles from '../typography.module.css'

class Paragraph extends PureComponent {
  render () {
    const { children } = this.props

    return (
      <p className={styles.paragraph}>
        { children }
      </p>
    )
  }
}

export default Paragraph
