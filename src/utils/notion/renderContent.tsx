import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import Callout from '@/components/blog/callout';
import { getSlug } from '../getSlug';
import { FaLink } from 'react-icons/fa';

import type { ReactNode } from 'react';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const renderContent = (block: any, index?: number, content?: BlockObjectResponse[]) => {
  const { type, id } = block;

  const value = _getRenderValue(block);

  switch (type) {
    case 'paragraph':
      return <p>{value}</p>;
    case 'heading_1':
      return (
        <h1 id={getSlug(value)} className='flex scroll-mt-24 items-center gap-3'>
          {value}
          <Link href={`#${getSlug(value)}`}>
            <FaLink size='1.15rem' />
          </Link>
        </h1>
      );
    case 'heading_2':
      return (
        <h2 id={getSlug(value)} className='flex scroll-mt-24 items-center gap-3'>
          {value}
          <Link href={`#${getSlug(value)}`}>
            <FaLink size='1.15rem' />
          </Link>
        </h2>
      );
    case 'heading_3':
      return (
        <h3 id={getSlug(value)} className='flex scroll-mt-24 items-center gap-3'>
          {value}
          <Link href={`#${getSlug(value)}`}>
            <FaLink size='1.15rem' />
          </Link>
        </h3>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      if (!index || typeof content === 'undefined') {
        return;
      }

      const list = _renderList(block, index, content);
      return list;
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            {<input type='checkbox' id={id} defaultChecked={value.checked} />} {value}
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>{value}</summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderContent(block)}</Fragment>
          ))}
        </details>
      );
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure className='flex flex-col items-center'>
          <Image src={src} alt={caption} width={825} height={500} />
          {/* {caption && <figcaption className='italic'>{caption}</figcaption>} */}
        </figure>
      );
    case 'divider':
      return <hr />;
    case 'quote':
      return <blockquote>{value}</blockquote>;
    case 'code':
      return <pre className='language-js'>{value}</pre>;
    case 'file':
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
    case 'child_page':
      return; // ignore child pages (ie. outlines, drafts)
    case 'callout':
      return <Callout block={block} renderedText={value} />;
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
      return (
        <Link href={rich_text.href} key={index} target='_blank'>
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
    case 'divider':
    case 'image':
    case 'child_page':
    case 'file':
      return block[type];
    case 'callout':
    case 'bulleted_list_item':
    case 'numbered_list_item':
    case 'paragraph':
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

  return block.type === 'bulleted_list_item' ? <ul key={block.id}>{list}</ul> : <ol>{list}</ol>;
}
