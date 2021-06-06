import { format, formateDistance, differenceInDays } from 'date-fns'
import React from 'react'
import { buildImageObj, getReadingTime } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import ReactMarkdown from 'react-markdown'
import Container from './container'
import Heading from './markdown-renderers/Heading'
import Paragraph from './markdown-renderers/Paragraph'
import CodeBlock from './markdown-renderers/CodeBlock'
import InlineCode from './markdown-renderers/InlineCode'
import RenderLink from './markdown-renderers/RenderLink'
import Blockquote from './markdown-renderers/Blockquote'
import ThematicBreak from './markdown-renderers/ThematicBreak'

import SickPick from './SickPick'

import * as styles from './blog-post.module.css'

function BlogPost (props) {
  const { body, tags, title, mainImage, publishedAt, sickPick } = props
  return (
    <article className={styles.root}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.metaContent}>
              {publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(publishedAt), new Date()) > 3
                    ? formateDistance(new Date(publishedAt), new Date())
                    : format(new Date(publishedAt), 'MMMM do, yyyy')}
                </div>
              )}
              {body && (
                <div className={styles.readingTime}>
                  <em>{getReadingTime(body)}</em>
                </div>
              )}
              {tags && (
                <div className={styles.tagsBlock}>
                  <ul className={styles.tags}>
                    {tags.map(tag => (
                      <li key={tag._id}>
                        <p>{tag.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {mainImage && mainImage.asset && (
              <div className={styles.mainImage}>
                <img
                  src={imageUrlFor(buildImageObj(mainImage))
                    .width(1200)
                    .height(Math.floor((9 / 16) * 1200))
                    .fit('crop')
                    .auto('format')
                    .url()}
                  alt={mainImage.alt}
                  title={mainImage.alt}
                />
              </div>
            )}
            {body &&
              <ReactMarkdown
                children={body}
                components={{
                  heading: Heading,
                  paragraph: Paragraph,
                  code: CodeBlock,
                  inlineCode: InlineCode,
                  link: RenderLink,
                  blockquote: Blockquote,
                  thematicBreak: ThematicBreak
                }}
              />
            }
            {sickPick &&
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SickPick sickPick={sickPick} />
              </div>
            }
          </div>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
