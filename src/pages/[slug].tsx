import {
  BlockObjectResponse,
  PropertyItemListResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Fragment } from 'react';
import { getAllPublishedBlogPosts, getBlocks, getPageProperty } from '@/clients/notion';
import { renderBlock } from '@/utils/notion/render';
import slugify from 'slugify';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import { BlogProperties } from 'src/types/notion';
import BlogHeader from '@/components/blog/header';

export default function Post({
  blogPostProperties,
  blocks,
}: {
  blogPostProperties: { properties: BlogProperties }[];
  blocks: BlockObjectResponse[];
}) {
  if (!blocks) {
    return null;
  }
  return (
    <main className='grid place-items-center'>
      <article className='prose'>
        <BlogHeader blogPostProperties={blogPostProperties} />
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
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
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  console.group('getStaticProps');
  console.log(slug);
  console.groupEnd();
  const { pageIds, properties } = await getAllPublishedBlogPosts();

  const titles = await Promise.all(
    pageIds.map((pageId: string) => {
      return getPageProperty(pageId, properties.Title.id) as Promise<PropertyItemListResponse>;
    })
  );

  const pageIdIndex = titles.findIndex((path: PropertyItemListResponse, index: number) => {
    const slugTitle = slugify((path.results[0] as TitlePropertyItemObjectResponse).title.plain_text).toLowerCase();
    return slugTitle === slug;
  });

  const pageId = pageIds[pageIdIndex];

  const [blogPostProperties, blocks] = await Promise.all([getBlogPostProperties(pageId), getBlocks(pageId)]);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block: any) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children;
    }
    return block;
  });

  return {
    props: {
      blogPostProperties,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
