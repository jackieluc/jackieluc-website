import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'

class CodeBlock extends PureComponent {
  render () {
    const { language, value } = this.props

    return (
      <ReactSyntaxHighlighter language={language} style={xonokai}>
        { value }
      </ReactSyntaxHighlighter>
    )
  }
}

CodeBlock.propTypes = {
  codeBlockData: PropTypes.shape({
    code: PropTypes.string.isRequired,
    language: PropTypes.string
  })
}

CodeBlock.defaultProps = {
  language: 'text'
}

export default CodeBlock
