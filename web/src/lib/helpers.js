import { format, isFuture } from 'date-fns'

export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes (data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsWithoutSlugs ({ slug }) {
  return (slug || {}).current
}

export function filterOutDocsPublishedInTheFuture ({ publishedAt }) {
  return !isFuture(publishedAt)
}

export function getBlogUrl (publishedAt, slug) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`
}

export function buildImageObj (source = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function toPlainText (blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

/**
 * See https://githubcom/rexxars/react-mrkdown#options
 * @param {*} url
 * @param {*} text
 * @param {*} title
 */
export function getLinkTargets (url, text, title) {
  const INTERNAL_ATTRIBUTES = '_blank'
  const EXTERNAL_ATTRIBUTES = '_blank noopener noreferrer'

  // internal links will start with /
  if (url.startsWith('/')) return INTERNAL_ATTRIBUTES

  return EXTERNAL_ATTRIBUTES
}
