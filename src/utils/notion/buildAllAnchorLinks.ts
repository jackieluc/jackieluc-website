import { getBlock } from '@/clients/notion';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getSlug } from '../getSlug';

/**
 * Given a paragraph block in Notion with an in-page anchor link (ie. <a href="#this-links-to-a-heading">some text</a>),
 * convert Notion's' "link to block" into a web page anchor link.
 *
 * @param content blog content from notion
 * @returns full blog content with modified anchor links
 */
export default async function buildAllAnchorLinks(content: BlockObjectResponse[]): Promise<BlockObjectResponse[]> {
  const modifiedContent: BlockObjectResponse[] = await Promise.all(
    content.map(async (block) => {
      if (block.type !== 'paragraph') {
        return block;
      }

      for (let i = 0; i < block.paragraph.rich_text.length; i++) {
        const textItem = block.paragraph.rich_text[i];

        if (textItem?.href?.startsWith('/') && textItem.href.includes('#')) {
          const blockId = textItem.href.split('#')[1];
          const anchorBlock = (await getBlock(blockId)) as any;
          const res = `#${getSlug(anchorBlock[anchorBlock.type]?.rich_text[0].plain_text)}`;
          block.paragraph.rich_text[i].href = res;
        }
      }

      return block;
    })
  );

  return modifiedContent;
}
