import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const inlineCodeStyle = {
  fontFamily: '"Inconsolata", monospace',
  margin: '3px',
  padding: '1px 6px',
  backgroundColor: '#f7f7f7',
  border: '1px solid #ededed',
  borderRadius: '5px'
}

class InlineCode extends PureComponent {
  render () {
    const { value } = this.props
    return (
      <code style={inlineCodeStyle}>
        { value }
      </code>
    )
  }
}

InlineCode.propTypes = {
  value: PropTypes.string.isRequired
}

export default InlineCode
