import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';

export function getBlockMockResponse(): GetBlockResponse {
  return {
    object: 'block',
    id: 'c02fc1d3-db8b-45c5-a222-27595b15aea7',
    parent: {
      type: 'page_id',
      page_id: '59833787-2cf9-4fdf-8782-e53db20768a5',
    },
    created_time: '2022-03-01T19:05:00.000Z',
    last_edited_time: '2022-03-01T19:05:00.000Z',
    created_by: {
      object: 'user',
      id: 'ee5f0f84-409a-440f-983a-a5315961c6e4',
    },
    last_edited_by: {
      object: 'user',
      id: 'ee5f0f84-409a-440f-983a-a5315961c6e4',
    },
    has_children: false,
    archived: false,
    type: 'heading_2',
    heading_2: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'Lacinato kale',
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'Lacinato kale',
          href: null,
        },
      ],
      color: 'default',
    },
  };
}
