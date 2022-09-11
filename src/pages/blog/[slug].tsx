import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import { getAllPublishedBlogPosts, getPageProperties } from '@/clients/notion';
import { renderContent } from '@/utils/notion/renderContent';
import { getSlug } from '@/utils/getSlug';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import BlogHeader from '@/components/blog/header';
import BlogFooter from '@/components/blog/footer';
import { getBlogPostContent } from '@/utils/notion/getBlogPostContent';
import parseProperty from '@/utils/notion/parseProperty';
import { getBlogPostUrl } from '@/utils/url';
import getSeoImage from '@/utils/seo/image';

import type { BlogProperties } from 'src/types/notion';
import type { SlugParams, BlogPostParams } from 'src/types/next';
import getRevalidateTime from '@/utils/blog/revalidate';

export default function Post({ slug, blogProperties, content }: BlogPostParams) {
  useEffect(() => {
    const registerView = async () => {
      await fetch(`/api/views/${slug}`, {
        method: 'POST',
      });
    };
    registerView();
  }, [slug]);

  if (!content) {
    return null;
  }

  const { title, excerpt, seokeywords } = blogProperties[0].properties;
  const blogPostUrl = getBlogPostUrl(slug);
  const { seoimage, seoimagealt } = getSeoImage(blogProperties[0].properties);

  return (
    <>
      <Head>
        <link rel='canonical' href={blogPostUrl} />
        <title>{title}</title>
        <meta name='description' content={excerpt} />
        {seokeywords ? <meta name='keywords' content={seokeywords} /> : null}
        <meta name='image' content={seoimage} />
        <meta name='author' content='Jackie Luc' />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={blogPostUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={excerpt} />
        <meta property='og:image' content={seoimage} />
        <meta property='og:image:alt' content={seoimagealt} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@jackiesthinking' />
        <meta name='twitter:creator' content='@jackiesthinking' />
      </Head>
      <main className='my-4 mb-16 grid place-items-center px-4 lg:mt-8'>
        <article className='prose'>
          <BlogHeader blogProperties={blogProperties[0]} /> {/* For this slug, we only have one blog properties */}
          <section>
            {content.map((block, index) => (
              <Fragment key={block.id}>{renderContent(block, index, content)}</Fragment>
            ))}
          </section>
          <BlogFooter blogProperties={blogProperties[0]} />
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

  let pageIdIndex: number = -1;

  for (let i = 0; i < pageIds.length; i++) {
    let [title, pathoverride] = metadata[i];

    const mappedProperties: Pick<BlogProperties, 'title' | 'pathoverride'> = {
      title: parseProperty(title),
      pathoverride: parseProperty(pathoverride),
    };

    if (mappedProperties.pathoverride && getSlug(mappedProperties.pathoverride) === slug) {
      pageIdIndex = i;
      break;
    } else if (getSlug(mappedProperties.title) === slug) {
      pageIdIndex = i;
      break;
    }
  }

  if (pageIdIndex === -1) {
    return {
      notFound: true,
    };
  }

  const pageId = pageIds[pageIdIndex];

  const [properties, content] = await Promise.all([getBlogPostProperties({ pageId }), getBlogPostContent(pageId)]);

  const publishedDate = properties[0].properties.published;

  return {
    props: {
      slug,
      blogProperties: properties,
      content,
    },
    // This generates a static value that will be refreshed after every deployment
    revalidate: getRevalidateTime(publishedDate),
  };
};
