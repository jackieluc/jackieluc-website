const EXTERNAL_ATTRIBUTES = '_blank noopener noreferrer'
const INTERNAL_ATTRIBUTES = '_blank'

function Links (url, text, title) {
  // internal links will start with /
  if (url.startsWith('/')) return INTERNAL_ATTRIBUTES

  return EXTERNAL_ATTRIBUTES
}

export default Links
