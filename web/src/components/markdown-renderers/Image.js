import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

class Image extends PureComponent {
  render () {
    const { src, alt } = this.props

    return (
      <ImageWrapper>
        <img src={src} alt={alt} style={{ width: '100%' }} />
      </ImageWrapper>
    )
  }
}

Image.propTypes = {
  ImageData: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  })
}

export default Image

// /Users/jackie/Documents/Blog/3 ways to end burnout
