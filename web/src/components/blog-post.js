import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj, getReadingTime } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
// import PortableText from './portableText'
import ReactMarkdown from 'react-markdown'
import Container from './container'
import AuthorList from './author-list'
import CodeBlock from './CodeBlock'
import InlineCode from './InlineCode'
import RenderLink from './RenderLink'

import styles from './blog-post.module.css'

function BlogPost (props) {
  const { body, authors, tags, title, mainImage, publishedAt } = props
  return (
    <article className={styles.root}>
      {/* {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .auto('format')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )} */}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.metaContent}>
              {publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(publishedAt), new Date()) > 3
                    ? distanceInWords(new Date(publishedAt), new Date())
                    : format(new Date(publishedAt), 'MMMM Do, YYYY')}
                </div>
              )}
              {body && (
                <div className={styles.readingTime}>
                  <em>{getReadingTime(body)}</em>
                </div>
              )}
              {/* {authors && <AuthorList items={authors} title='Author' />} */}
              {tags && (
                <div className={styles.tagsBlock}>
                  {/* <h3 className={styles.tagsHeadline}>Tags</h3> */}
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
            {body && <ReactMarkdown source={body} renderers={{ code: CodeBlock, inlineCode: InlineCode, link: RenderLink }} />}
          </div>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
