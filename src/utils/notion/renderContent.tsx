import { Fragment } from 'react';

const renderNestedList = (block: any) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol>{value.children.map((block: any) => renderContent(block))}</ol>;
  }
  return <ul>{value.children.map((block: any) => renderContent(block))}</ul>;
};

export const renderContent = (block: any) => {
  const { type, id } = block;
  // let richText = block[type].rich_text;
  const value = block[type].rich_text[0]?.plain_text;

  switch (type) {
    case 'paragraph':
      return <p>{value}</p>;
    case 'heading_1':
      return <h1>{value}</h1>;
    case 'heading_2':
      return <h2>{value}</h2>;
    case 'heading_3':
      return <h3>{value}</h3>;
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          {value}
          {!!value.children && renderNestedList(block)}
        </li>
      );
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
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value}</blockquote>;
    case 'code':
      return (
        <pre className='language-js'>
          <code className='' key={id}>
            {value}
          </code>
        </pre>
      );
    case 'file':
      const src_file = value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div>
            📎 <a href={src_file}>{lastElementInArray.split('?')[0]}</a>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case 'bookmark':
      const href = value.url;
      return (
        <a href={href} target='_brank'>
          {href}
        </a>
      );
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`;
  }
};
