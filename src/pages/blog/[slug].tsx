import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Fragment } from 'react';
import { getAllPublishedBlogPosts, getPageProperties } from '@/clients/notion';
import { renderContent } from '@/utils/notion/renderContent';
import getSlug from '@/utils/getSlug';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import { BlogProperties } from 'src/types/notion';
import BlogHeader from '@/components/blog/header';
import { getBlogPostContent } from '@/utils/notion/getBlogPostContent';
import parseProperty from '@/utils/notion/parseProperty';
import { SlugParams } from 'src/types/next';

export default function Post({
  blogProperties,
  content,
  pageId,
}: {
  blogProperties: { properties: BlogProperties }[];
  content: BlockObjectResponse[];
  pageId: string;
}) {
  if (!content) {
    return null;
  }

  return (
    <main className='grid place-items-center px-6'>
      <article className='prose'>
        <BlogHeader blogProperties={blogProperties[0]} /> {/* For this slug, we only have one blog properties */}
        <section>
          {content.map((block, index) => (
            <Fragment key={block.id}>{renderContent(block, index, content)}</Fragment>
          ))}
        </section>
      </article>
    </main>
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
    fallback: false, // false: 404s if can't find blog post
  };
};

/**
 * Gets the specific blog post properties and content from all published blog post IDs and properties
 * and then filters down based on the slug from getStaticPaths.
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
    throw Error(`Can't find page index that matches slug`);
  }

  const pageId = pageIds[pageIdIndex];

  const [properties, content] = await Promise.all([getBlogPostProperties(pageId), getBlogPostContent(pageId)]);

  return {
    props: {
      blogProperties: properties,
      content,
      pageId,
    },
    revalidate: 1, // TODO write a function to get a revalidate time based on when the blog post was published. eg. recently published: revalidate every hour for a day, blog posts > 7 days old, revalidate weekly/monthly
  };
};
