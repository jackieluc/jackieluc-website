import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledThematicBreak = styled.hr`
  margin: 2rem 0;
  /* border: 2px var(--color-accent) solid; */
  font-weight: 600;
  border: none;
  text-align: center;
  font-size: 24px;

  &:before {
    content: '. . .';
    letter-spacing: 1rem;
  }
`

class ThematicBreak extends PureComponent {
  render () {
    return <StyledThematicBreak />
  }
}

export default ThematicBreak
