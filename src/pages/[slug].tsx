import {
  BlockObjectResponse,
  PageObjectResponse,
  PropertyItemListResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Fragment } from 'react';
import { getAllPublishedBlogPosts, getPage, getBlocks, getPageProperty } from '@/clients/notion';
import { renderBlock } from '@/utils/notion/render';
import slugify from 'slugify';

export default function Post({ page, blocks }: { page: PageObjectResponse; blocks: BlockObjectResponse[] }) {
  if (!page || !blocks) {
    return null;
  }
  return (
    <main className='grid place-items-center'>
      <article className='prose'>
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

  const [page, blocks] = await Promise.all([getPage(pageId), getBlocks(pageId)]);

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
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
