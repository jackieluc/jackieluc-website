import { TableOfContent } from './../../types/next';
import { getSlug } from '../getSlug';

import { BlockType } from './../../types/notion';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Given blog content, find all the headings in the page and return the slug
 *
 * @param content blog content from notion
 * @returns list of headings on the page
 */
export default function buildTableOfContents(content: BlockObjectResponse[]) {
  const headingBlocks = content.filter((block) =>
    [BlockType.Heading2, BlockType.Heading3].includes(block.type as BlockType)
  ) as any;

  const tableOfContents: TableOfContent[] = [];
  let index = 0;
  while (index < headingBlocks.length && headingBlocks[index]?.type) {
    const headingBlock = headingBlocks[index];
    const title = headingBlock[headingBlock.type].rich_text[0].plain_text;

    let tocItem: TableOfContent = {
      title,
      url: `#${getSlug(title)}`,
    };

    if (headingBlock?.type === BlockType.Heading2) {
      // if next block is not h3
      if (headingBlocks[index + 1]?.type !== BlockType.Heading3) {
        index++;
      } else {
        // add h3 children to h2
        const childrenHeadings = [];
        while (headingBlocks[index + 1]?.type === BlockType.Heading3) {
          const headingBlock = headingBlocks[index + 1];
          const title = headingBlock[headingBlock.type].rich_text[0].plain_text;
          let tocItem: TableOfContent = {
            title,
            url: `#${getSlug(title)}`,
          };

          childrenHeadings.push(tocItem);
          index++;
        }
        tocItem.children = [...childrenHeadings];
        index++;
      }

      tableOfContents.push(tocItem);
    }
  }

  return tableOfContents;
}
