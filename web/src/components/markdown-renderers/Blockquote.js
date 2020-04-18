import React, { PureComponent } from 'react'
import styles from 'styled-components'

const StyledBlockquote = styles.blockquote`
  font-family: 'Lora';
  margin: 0;
  padding-left: 30px;
  font-size: 24px;
  color: #697a90; // gray from ../../styles/custom-properties.css
  border-left: 5px solid #697a90;
`

class Blockquote extends PureComponent {
  render () {
    const { children } = this.props

    return (
      <StyledBlockquote>
        { children }
      </StyledBlockquote>
    )
  }
}

export default Blockquote
