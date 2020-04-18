import React, { PureComponent } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

class RenderLink extends PureComponent {
  render () {
    const { href, children } = this.props

    // Internal links on website
    if (href.startsWith('/')) return <Link to={href}>{children}</Link>

    // External links on website
    return (
      <a href={href} target='_blank' rel='noopener noreferrer'>
        {children}
        <span className='screen-reader-only'>(opens in a new tab)</span>
      </a>
    )
  }
}

RenderLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
}

export default RenderLink
