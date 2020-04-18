import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledInlineCode = styled.code`
  font-family: Inconsolata, monospace;
  margin: 3px;
  padding: 1px 6px;
  background-color: #f7f7f7;
  border: 1px solid #ededed;
  border-radius: 5px;
`

class InlineCode extends PureComponent {
  render () {
    const { value } = this.props
    return (
      <StyledInlineCode>
        { value }
      </StyledInlineCode>
    )
  }
}

InlineCode.propTypes = {
  value: PropTypes.string.isRequired
}

export default InlineCode
