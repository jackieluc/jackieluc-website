import { getBlock } from '@/clients/notion';
import { getSlug } from '../getSlug';

import type { BlockObjectResponse, ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlockType } from 'src/types/notion';

/**
 * Given a paragraph block in Notion, convert Notion's' "link to block"
 * into a web page anchor link (ie. <a href="#this-links-to-a-heading">some text</a>)
 *
 * @param content blog content from notion
 * @returns full blog content with modified anchor links
 */
export default async function buildAllAnchorLinks(content: BlockObjectResponse[]): Promise<BlockObjectResponse[]> {
  const modifiedContent: BlockObjectResponse[] = await Promise.all(
    content.map(async (block) => {
      if (block.type !== BlockType.Paragraph) {
        return block;
      }

      for (let i = 0; i < block.paragraph.rich_text.length; i++) {
        let textItem = block.paragraph.rich_text[i];

        if (textItem?.href?.startsWith('/') && textItem.href.includes('#')) {
          const blockId = textItem.href.split('#')[1];
          const anchorBlock = (await getBlock(blockId)) as ParagraphBlockObjectResponse;
          textItem.href = `#${getSlug(anchorBlock[anchorBlock.type]?.rich_text[0].plain_text)}`;
        }
      }

      return block;
    })
  );

  return modifiedContent;
}
