import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledBlockquote = styled.blockquote`
  font-family: 'Lora';
  margin: 0;
  padding-left: 20px;
  color: var(--color-gray);
  border-left: 2px solid #697a90;
`

class Blockquote extends PureComponent {
  render () {
    const { children } = this.props

    return (
      <div style={{ paddingLeft: '10px' }}>
        <StyledBlockquote>
          <em>
            { children }
          </em>
        </StyledBlockquote>
      </div>
    )
  }
}

export default Blockquote
