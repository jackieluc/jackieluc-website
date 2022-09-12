import { getBlocks } from '@/clients/notion';

import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function getBlogPostContent(page_id: string): Promise<BlockObjectResponse[]> {
  let page = await getBlocks(page_id);

  // get all blocks within the page including nested blocks like
  // list items or intended paragraphs
  let blocks = await getChildrenBlocksOneLevelDeep(page.results as BlockObjectResponse[]);

  // if page is paginated, repeat
  while (page.has_more && page.next_cursor) {
    page = await getBlocks(page_id, page.next_cursor);
    blocks = blocks.concat(await getChildrenBlocksOneLevelDeep(page.results as BlockObjectResponse[]));
  }

  return blocks;
}

/**
 * Retrieve block children for nested blocks (one level deep), for example toggle or list blocks
 * ref: https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
 *
 * @param blocks
 * @returns
 */
async function getChildrenBlocksOneLevelDeep(blocks: BlockObjectResponse[]): Promise<BlockObjectResponse[]> {
  const childBlocks = await Promise.all(
    blocks
      .filter((block: BlockObjectResponse) => block.has_children)
      .map(async (block: BlockObjectResponse) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((block: any) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find((childBlock) => childBlock.id === block.id)?.children;
    }
    return block;
  });

  return blocksWithChildren;
}
