import React from 'react'
import Figure from './Figure'
import CodeBlock from './CodeBlock'

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    code: ({ node }) => <CodeBlock codeBlockData={node} />
  }
}

export default serializers
