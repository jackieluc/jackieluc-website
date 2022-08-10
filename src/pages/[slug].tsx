import {
  BlockObjectResponse,
  PropertyItemListResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Fragment } from 'react';
import { getAllPublishedBlogPosts, getPageProperty } from '@/clients/notion';
import { renderContent } from '@/utils/notion/renderContent';
import slugify from 'slugify';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import { BlogProperties } from 'src/types/notion';
import BlogHeader from '@/components/blog/header';
import { getBlogPostContent } from '@/utils/notion/getBlogPostContent';

export default function Post({
  properties,
  content,
}: {
  properties: { properties: BlogProperties }[];
  content: BlockObjectResponse[];
}) {
  if (!content) {
    return null;
  }
  return (
    <main className='grid place-items-center'>
      <article className='prose'>
        <BlogHeader blogPostProperties={properties} />
        <section>
          {content.map((block) => (
            <Fragment key={block.id}>{renderContent(block)}</Fragment>
          ))}
        </section>
      </article>
    </main>
  );
}

export const getStaticPaths = async () => {
  const { pageIds, properties } = await getAllPublishedBlogPosts();

  const titles = await Promise.all(
    pageIds.map((pageId: string) => {
      return getPageProperty(pageId, properties.Title.id) as Promise<PropertyItemListResponse>;
    })
  );

  let paths = titles.map((path: PropertyItemListResponse) => {
    let slug = slugify((path.results[0] as TitlePropertyItemObjectResponse).title.plain_text).toLowerCase();

    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false, // false: 404s if can't find blog post
  };
};

/**
 * Gets the specific blog post properties and content from all published blog post IDs and properties
 * and then filters down based on the slug from getStaticPaths.
 * @param slug - slug of the blog post from getStaticPaths
 * @returns
 */
export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { pageIds, properties: notionProperties } = await getAllPublishedBlogPosts();

  const titles = await Promise.all(
    pageIds.map((pageId: string) => {
      return getPageProperty(pageId, notionProperties.Title.id) as Promise<PropertyItemListResponse>;
    })
  );

  const pageIdIndex = titles.findIndex((path: PropertyItemListResponse) => {
    const slugTitle = slugify((path.results[0] as TitlePropertyItemObjectResponse).title.plain_text).toLowerCase();
    return slugTitle === slug;
  });

  const pageId = pageIds[pageIdIndex];

  const [properties, content] = await Promise.all([getBlogPostProperties(pageId), getBlogPostContent(pageId)]);

  return {
    props: {
      properties,
      content,
    },
    revalidate: 1,
  };
};
