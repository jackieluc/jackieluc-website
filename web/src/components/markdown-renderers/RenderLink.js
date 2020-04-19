import React, { PureComponent } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

class RenderLink extends PureComponent {
  render () {
    const { href, children } = this.props

    // Internal links on website
    if (href.startsWith('/')) return <Link to={href}>{children}</Link>

    // External links on website with Google Analytics
    return (
      <OutboundLink href={href} target='_blank' rel='noopener noreferrer' title={href}>
        {children}
        <span className='screen-reader-only'>(opens in a new tab)</span>
      </OutboundLink>
    )
  }
}

RenderLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
}

export default RenderLink
