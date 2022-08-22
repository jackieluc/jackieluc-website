import {
  DatePropertyItemObjectResponse,
  GetPagePropertyResponse,
  MultiSelectPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

export default function parseProperty(prop: GetPagePropertyResponse): string {
  let type;
  if (prop.object === 'list' && 'results' in prop) {
    type = prop.property_item.type;
    prop = prop.results[0]; // normalize list object to PropertyItemObjectResponse for readable switch statements
  } else {
    type = prop.type;
  }

  switch (type) {
    case 'title':
      return (prop as TitlePropertyItemObjectResponse)?.title?.plain_text ?? '';
    case 'rich_text':
      return (prop as RichTextPropertyItemObjectResponse)?.rich_text?.plain_text ?? '';
    case 'select':
      return (prop as SelectPropertyItemObjectResponse).select?.name ?? '';
    case 'multi_select':
      return JSON.stringify((prop as MultiSelectPropertyItemObjectResponse)?.multi_select) ?? '[]';
    case 'number':
      return String((prop as NumberPropertyItemObjectResponse)?.number) ?? '0';
    case 'date':
      return (prop as DatePropertyItemObjectResponse).date?.start ?? '';
    default:
      return '';
  }
}
