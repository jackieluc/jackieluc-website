import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Fragment } from 'react';
import { getAllPublishedBlogPosts, getPage, getBlocks } from '@/clients/notion';
import { renderBlock } from '@/utils/notion/render';

export default function Post({ page, blocks }: { page: PageObjectResponse; blocks: BlockObjectResponse[] }) {
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <main className='grid place-items-center'>
      <article className='prose'>
        <h1>
          <p>{page.properties.title}</p>
        </h1>
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
  const database = await getAllPublishedBlogPosts();

  return {
    paths: database.pageIds.map((id: string) => ({ params: { id } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

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
