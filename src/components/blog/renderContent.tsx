import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import Callout from '@/components/blog/callout';
import { getSlug } from '../../utils/getSlug';
import { FaLink } from 'react-icons/fa';

import type { ReactNode } from 'react';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlockType } from 'src/types/notion';

export const renderContent = (block: any, index?: number, content?: BlockObjectResponse[]) => {
  const { type, id } = block;

  const value = _getRenderValue(block);

  switch (type) {
    case BlockType.Paragraph:
      return <p>{value}</p>;
    case BlockType.Heading1:
      return (
        <h1 id={getSlug(value)} className='flex scroll-mt-24 items-center gap-3'>
          {value}
          <Link href={`#${getSlug(value)}`}>
            <FaLink size='1.15rem' />
          </Link>
        </h1>
      );
    case BlockType.Heading2:
      return (
        <h2 id={getSlug(value)} className='flex scroll-mt-24 items-center gap-3'>
          {value}
          <Link href={`#${getSlug(value)}`}>
            <FaLink size='1.15rem' />
          </Link>
        </h2>
      );
    case BlockType.Heading3:
      return (
        <h3 id={getSlug(value)} className='flex scroll-mt-24 items-center gap-3'>
          {value}
          <Link href={`#${getSlug(value)}`}>
            <FaLink size='1.15rem' />
          </Link>
        </h3>
      );
    case BlockType.BulletedListItem:
    case BlockType.NumberedListItem:
      if (!index || typeof content === 'undefined') {
        return;
      }

      const list = _renderList(block, index, content);
      return list;
    case BlockType.Image:
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure className='mt-0 flex flex-col items-center'>
          <Image src={src} alt={caption} width={825} height={500} />
          {/* {caption && <figcaption className='italic'>{caption}</figcaption>} */}
        </figure>
      );
    case BlockType.ChildPage:
      return; // ignore child pages (ie. outlines, drafts)
    case BlockType.Callout:
      return <Callout block={block} renderedText={value} />;
    case BlockType.Toggle:
      return (
        <details>
          <summary>{value}</summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderContent(block)}</Fragment>
          ))}
        </details>
      );
    case BlockType.Divider:
      return <hr />;
    case BlockType.Quote:
      return <blockquote>{value}</blockquote>;
    case BlockType.Code:
      return <pre className='language-js'>{value}</pre>;
    case BlockType.File:
      const src_file = value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure className='m-0'>
          <Link href={src_file}>📎 {lastElementInArray.split('?')[0]}</Link>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case BlockType.ToDo:
      return (
        <div>
          <label htmlFor={id}>
            {<input type='checkbox' id={id} defaultChecked={value.checked} />} {value}
          </label>
        </div>
      );
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`;
  }
};

const _renderParagraph = (block: any) => {
  const { type } = block;
  const { rich_text: rich_text_list } = block[type];

  if (rich_text_list.length === 0) {
    return null;
  }

  const renderedText = rich_text_list.map((rich_text: any, index: number) => {
    if (rich_text.href) {
      const isAnchorLink: boolean = rich_text.href.startsWith('#');

      return (
        <Link href={rich_text.href} key={index} target={isAnchorLink ? undefined : '_blank'}>
          {rich_text.plain_text}
        </Link>
      );
    }
    const { bold, italic, code } = rich_text.annotations;

    if (!bold && !italic && !code) {
      return rich_text.plain_text;
    }

    if (code) {
      return (
        <code className='text-secondary rounded-lg bg-gray-200 py-1' key={index}>
          {rich_text.plain_text}
        </code>
      );
    }

    return (
      <span className={`${bold ? 'text-secondary font-bold' : ''}${italic ? 'italic' : ''}`} key={index}>
        {rich_text.plain_text}
      </span>
    );
  });

  return renderedText;
};

function _getRenderValue(block: any) {
  const { type } = block;

  switch (type) {
    case BlockType.Divider:
    case BlockType.Image:
    case BlockType.ChildPage:
    case BlockType.File:
      return block[type];
    case BlockType.Callout:
    case BlockType.BulletedListItem:
    case BlockType.NumberedListItem:
    case BlockType.Paragraph:
      return _renderParagraph(block);
    default:
      return block[type].rich_text[0]?.plain_text;
  }
}

function _renderList(block: any, index: number, content: BlockObjectResponse[]) {
  const prevBlock = content[index - 1];

  // if the current block matches prev block type, then ignore it
  if (block.type === prevBlock?.type) {
    return;
  }

  const list: ReactNode[] = [<li key={index.toString()}>{_getRenderValue(block)}</li>];

  // while we find list items, add to the list
  // list is never too long so don't need to worry about optimizing
  while (content[index + 1]?.type === block.type) {
    list.push(<li key={(index + 1).toString()}>{_getRenderValue(content[index + 1])}</li>);
    index++;
  }

  return block.type === BlockType.BulletedListItem ? <ul key={block.id}>{list}</ul> : <ol>{list}</ol>;
}
