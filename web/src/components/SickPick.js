import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import Heading from './markdown-renderers/Heading'
import Paragraph from './markdown-renderers/Paragraph'
import RenderLink from './markdown-renderers/RenderLink'
import Blockquote from './markdown-renderers/Blockquote'

import styles from './typography.module.css'

const StyledSickPick = styled.section`
  margin-top: 4em;
  padding: 2rem;
  border: 1px solid var(--color-accent);
  box-shadow: var(--color-accent) 0.5rem 0.5rem;

  hr {
    margin: 1rem 0;
    border-top: 1px dashed var(--color-accent);
  }

  p {
    margin: 0;
  }
`

const SickPick = ({ sickPick }) => (
  <StyledSickPick>
    <h2 className={styles.responsiveTitle2} style={{ marginTop: '0' }}>Sick Pick</h2>
    <small>
      <em>
        A <b>Sick Pick</b> is something I enjoy that I want to share with you all. It is inspired by the <a href='https://syntax.fm' target='_blank'>Syntax.fm</a> podcast!
      </em>
    </small>
    <hr />
    <ReactMarkdown
      source={sickPick}
      renderers={{
        heading: Heading,
        paragraph: Paragraph,
        link: RenderLink,
        blockquote: Blockquote
      }}
    />
  </StyledSickPick>
)

export default SickPick
