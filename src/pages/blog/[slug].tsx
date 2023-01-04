import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { getAllPublishedBlogPosts, getPageProperties } from '@/clients/notion';
import { renderContent } from '@/components/blog/renderContent';
import { getSlug } from '@/utils/getSlug';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import buildTableOfContents from '@/utils/notion/buildTableOfContents';
import TableOfContents from '@/components/blog/tableOfContents';
import BlogHeader from '@/components/blog/header';
import BlogFooter from '@/components/blog/footer';
import buildAllAnchorLinks from '@/utils/notion/buildAllAnchorLinks';
import { getBlogPostContent } from '@/utils/notion/getBlogPostContent';
import parseProperty from '@/utils/notion/parseProperty';
import { getBlogPostUrl } from '@/utils/url';
import getSeoImage from '@/utils/seo/image';
import useMediaQuery from '@/utils/layout/useMediaQuery';
import { BREAKPOINTS } from '@/config/constants';

import type { BlogProperties } from 'src/types/notion';
import type { SlugParams, BlogPostParams } from 'src/types/next';
import getRevalidateTime from '@/utils/blog/revalidate';
import { FaCheckCircle } from 'react-icons/fa';

export default function Post({ slug, blogProperties, tableOfContents, content }: BlogPostParams) {
  useEffect(() => {
    const registerView = async () => {
      await fetch(`/api/views/${slug}`, {
        method: 'POST',
      });
    };
    registerView();
  }, [slug]);

  const [showAlert, setShowAlert] = useState(false);
  const isSmallScreen = useMediaQuery(BREAKPOINTS.xl); // xl

  if (!content) {
    return null;
  }

  const { title, excerpt, seokeywords } = blogProperties[0].properties;
  const blogPostUrl = getBlogPostUrl(slug);
  const { seoimage, seoimagealt } = getSeoImage(blogProperties[0].properties);

  return (
    <>
      <Head>
        <link rel='canonical' href={blogPostUrl} key='canonical' />
        <title key='title'>{title}</title>
        <meta name='description' content={excerpt} key='description' />
        {seokeywords ? <meta name='keywords' content={seokeywords} key='keywords' /> : null}
        <meta name='image' content={seoimage} key='image' />
        <meta name='author' content='Jackie Luc' key='author' />
        <meta property='og:type' content='article' key='og:type' />
        <meta property='og:url' content={blogPostUrl} key='og:url' />
        <meta property='og:title' content={title} key='og:title' />
        <meta property='og:description' content={excerpt} key='og:description' />
        <meta property='og:image' content={seoimage} key='og:image' />
        <meta property='og:image:alt' content={seoimagealt} key='og:image:alt' />
        <meta name='twitter:card' content='summary_large_image' key='twitter:card' />
        <meta name='twitter:site' content='@jackiesthinking' key='twitter:site' />
        <meta name='twitter:creator' content='@jackiesthinking' key='twitter:creator' />
      </Head>
      {/* Relative element to anchor alert notifications */}
      <div className='pointer-events-none fixed inset-4 top-8 z-50 lg:top-24'>
        {showAlert ? (
          <div
            className={`bg-primary mx-auto max-w-fit rounded-xl p-4 text-white transition-opacity ease-out ${
              showAlert ? 'animate-fade-in-and-out' : ''
            }`}
            onAnimationEnd={() => setShowAlert(false)}
          >
            <p className='flex items-center gap-2'>
              <FaCheckCircle size='1.5rem' /> copied to clipboard
            </p>
          </div>
        ) : null}
      </div>
      <div className='prose my-4 mx-auto mb-8 max-w-5xl justify-center px-4 md:px-8 lg:px-24 xl:px-4'>
        <BlogHeader blogProperties={blogProperties[0]} /> {/* For this slug, we only have one blog properties */}
      </div>
      <main className='my-4 mb-16 flex flex-col items-center justify-center px-4 md:px-8 lg:mt-8 xl:flex-row-reverse xl:items-start'>
        {isSmallScreen ? (
          <aside className='mb-8 w-full max-w-[65ch]'>
            <TableOfContents tableOfContents={tableOfContents} isSmallScreen={true} />
          </aside>
        ) : (
          <aside className='sticky top-36 flex flex-col gap-4 pl-8 text-sm'>
            <TableOfContents tableOfContents={tableOfContents} />
            <BlogFooter blogProperties={blogProperties[0]} showAlertFunc={setShowAlert} />
          </aside>
        )}
        <article className='prose'>
          <section>
            {content.map((block, index) => (
              <Fragment key={block.id}>{renderContent(block, index, content)}</Fragment>
            ))}
          </section>
          {isSmallScreen ? <BlogFooter blogProperties={blogProperties[0]} showAlertFunc={setShowAlert} /> : null}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const { pageIds, properties } = await getAllPublishedBlogPosts();

  const metadata = await Promise.all(
    pageIds.map((pageId: string) => {
      return getPageProperties(pageId, [properties.Title.id, properties.PathOverride.id]);
    })
  );

  const paths: SlugParams[] = [];

  pageIds.forEach((_, index) => {
    let [title, pathoverride] = metadata[index];

    const mappedProperties: Pick<BlogProperties, 'title' | 'pathoverride'> = {
      title: parseProperty(title),
      pathoverride: parseProperty(pathoverride),
    };

    // if there is no url path override, use the blog post's title as the url path
    if (mappedProperties.pathoverride) {
      paths.push({
        params: {
          slug: getSlug(mappedProperties.pathoverride),
        },
      });
    } else {
      paths.push({
        params: {
          slug: getSlug(mappedProperties.title),
        },
      });
    }
  });

  return {
    paths,
    // run getStaticProps if path cannot be found, this means we don't need to redeploy the site
    // when we publish a new blog post
    fallback: 'blocking',
  };
};

/**
 * Gets the specific blog post properties and content from all published blog post IDs and properties
 * and then filters down based on the slug from getStaticPaths.
 *
 * With getStaticPath's fallback prop, if we can't find the blog post in Notion, we will return 404 not found.
 *
 * - Build Table of Contents for the page
 * - Build any internal anchor links
 *
 * @param slug - slug of the blog post from getStaticPaths
 * @returns
 */
export const getStaticProps = async ({ params: { slug } }: SlugParams) => {
  const { pageIds, properties: notionProperties } = await getAllPublishedBlogPosts();

  const metadata = await Promise.all(
    pageIds.map((pageId: string) => {
      return getPageProperties(pageId, [notionProperties.Title.id, notionProperties.PathOverride.id]);
    })
  );

  let foundPageIdIndex: number = -1;

  for (let i = 0; i < pageIds.length; i++) {
    let [title, pathoverride] = metadata[i];

    const mappedProperties: Pick<BlogProperties, 'title' | 'pathoverride'> = {
      title: parseProperty(title),
      pathoverride: parseProperty(pathoverride),
    };

    if (mappedProperties.pathoverride && getSlug(mappedProperties.pathoverride) === slug) {
      foundPageIdIndex = i;
      break;
    } else if (getSlug(mappedProperties.title) === slug) {
      foundPageIdIndex = i;
      break;
    }
  }

  if (foundPageIdIndex === -1) {
    return {
      notFound: true,
    };
  }

  const pageId = pageIds[foundPageIdIndex];
  const [properties, blogContent] = await Promise.all([getBlogPostProperties({ pageId }), getBlogPostContent(pageId)]);
  const tableOfContents = buildTableOfContents(blogContent);
  const content = await buildAllAnchorLinks(blogContent);
  const publishedDate = properties[0].properties.published;

  return {
    props: {
      slug,
      blogProperties: properties,
      tableOfContents,
      content,
    },
    // This generates a static value that will be refreshed after every deployment
    revalidate: getRevalidateTime(publishedDate),
  };
};
