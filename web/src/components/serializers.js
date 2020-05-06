import React from 'react'
import Figure from './Figure'
import CodeBlock from './markdown-renderers/CodeBlock'

const serializers = {
  types: {
    mainImage: Figure,
    code: ({ node }) => <CodeBlock codeBlockData={node} />
  }
}

export default serializers
