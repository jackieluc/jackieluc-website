import { NotionBlogProperties } from './../../src/types/notion';
import {
  GetBlockResponse,
  GetPagePropertyResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Database } from 'src/types/notion';

export function getPageMockResponse(): GetPageResponse {
  return {
    object: 'page',
    id: '59833787-2cf9-4fdf-8782-e53db20768a5',
    created_time: '2022-03-01T19:05:00.000Z',
    last_edited_time: '2022-07-06T20:25:00.000Z',
    created_by: {
      object: 'user',
      id: 'ee5f0f84-409a-440f-983a-a5315961c6e4',
    },
    last_edited_by: {
      object: 'user',
      id: '0c3e9826-b8f7-4f73-927d-2caaf86f1103',
    },
    cover: {
      type: 'external',
      external: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg',
      },
    },
    icon: {
      type: 'emoji',
      emoji: '🥬',
    },
    parent: {
      type: 'database_id',
      database_id: 'd9824bdc-8445-4327-be8b-5b47500af6ce',
    },
    archived: false,
    properties: {
      'Store availability': {
        id: '%3AUPp',
        type: 'multi_select',
        multi_select: [
          {
            id: 't|O@',
            name: "Gus's Community Market",
            color: 'yellow',
          },
          {
            id: '{Ml\\',
            name: 'Rainbow Grocery',
            color: 'gray',
          },
        ],
      },
      'Food group': {
        id: 'A%40Hk',
        type: 'select',
        select: {
          id: '5e8e7e8f-432e-4d8a-8166-1821e10225fc',
          name: '🥬 Vegetable',
          color: 'pink',
        },
      },
      Price: {
        id: 'BJXS',
        type: 'number',
        number: 2.5,
      },
      'Responsible Person': {
        id: 'Iowm',
        type: 'people',
        people: [
          {
            object: 'user',
            id: 'cbfe3c6e-71cf-4cd3-b6e7-02f38f371bcc',
            name: 'Cristina Cordova',
            avatar_url:
              'https://lh6.googleusercontent.com/-rapvfCoTq5A/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nDKmmUpkpFvWNBzvu9rnZEy7cbl8Q/photo.jpg',
            type: 'person',
            person: {
              email: 'cristina@makenotion.com',
            },
          },
        ],
      },
      'Last ordered': {
        id: 'Jsfb',
        type: 'date',
        date: {
          start: '2022-02-22',
          end: null,
          time_zone: null,
        },
      },
      'Cost of next trip': {
        id: 'WOd%3B',
        type: 'formula',
        formula: {
          type: 'number',
          number: 0,
        },
      },
      Recipes: {
        id: 'YfIu',
        type: 'relation',
        relation: [
          {
            id: '90eeeed8-2cdd-4af4-9cc1-3d24aff5f63c',
          },
          {
            id: 'a2da43ee-d43c-4285-8ae2-6d811f12629a',
          },
        ],
        has_more: false,
      },
      Description: {
        id: '_Tc_',
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'A dark ',
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
            plain_text: 'A dark ',
            href: null,
          },
          {
            type: 'text',
            text: {
              content: 'green',
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'green',
            },
            plain_text: 'green',
            href: null,
          },
          {
            type: 'text',
            text: {
              content: ' leafy vegetable',
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
            plain_text: ' leafy vegetable',
            href: null,
          },
        ],
      },
      'In stock': {
        id: '%60%5Bq%3F',
        type: 'checkbox',
        checkbox: true,
      },
      'Number of meals': {
        id: 'zag~',
        type: 'rollup',
        rollup: {
          type: 'number',
          number: 2,
          function: 'count',
        },
      },
      Photo: {
        id: '%7DF_L',
        type: 'url',
        url: 'https://i.insider.com/612fb23c9ef1e50018f93198?width=1136&format=jpeg',
      },
      Name: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'Tuscan kale',
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
            plain_text: 'Tuscan kale',
            href: null,
          },
        ],
      },
    },
    url: 'https://www.notion.so/Tuscan-kale-598337872cf94fdf8782e53db20768a5',
  } as any;
}

export function getPagePropertyMockResponse(): GetPagePropertyResponse {
  return {
    object: 'property_item',
    id: 'kjPO',
    type: 'number',
    number: 2,
  };
}

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

export function getBlocksMockResponse(): ListBlockChildrenResponse {
  return {
    object: 'list',
    results: [
      {
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
      },
      {
        object: 'block',
        id: 'acc7eb06-05cd-4603-a384-5e1e4f1f4e72',
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
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content:
                  'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
                link: {
                  url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
                },
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text:
                'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
              href: 'https://en.wikipedia.org/wiki/Lacinato_kale',
            },
          ],
          color: 'default',
        },
      },
    ],
    next_cursor: null,
    has_more: false,
    type: 'block',
    block: {},
  };
}

export function getDatabaseQueryMockResponse(env: 'development' | 'production'): QueryDatabaseResponse {
  const response = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: 'a460ac82-4c2c-472c-9c9c-eb2c15567714',
        created_time: '2022-10-11T06:46:00.000Z',
        last_edited_time: '2022-10-12T04:19:00.000Z',
        created_by: {
          object: 'user',
          id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
        },
        last_edited_by: {
          object: 'user',
          id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
        },
        cover: null,
        icon: null,
        parent: {
          type: 'database_id',
          database_id: '1e3fc304-6d0e-4b83-9a79-be3b42232f97',
        },
        archived: false,
        properties: {
          Created: {
            id: '%3BIRW',
            type: 'created_time',
            created_time: '2022-10-11T06:46:00.000Z',
          },
          Views: {
            id: '%3Bkum',
            type: 'number',
            number: null,
          },
          PathOverride: {
            id: '%3FvG%3C',
            type: 'rich_text',
            rich_text: [],
          },
          Published: {
            id: '%40BgH',
            type: 'date',
            date: {
              start: '2022-10-10',
              end: null,
              time_zone: null,
            },
          },
          SeoImageAlt: {
            id: '%40GM%7D',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content:
                    'A sunset landscape photo of Seattle’s skyline from Kerry Park with downtown on the left and Mount Rainier on the right in the distance.',
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
                plain_text:
                  'A sunset landscape photo of Seattle’s skyline from Kerry Park with downtown on the left and Mount Rainier on the right in the distance.',
                href: null,
              },
            ],
          },
          Updated: {
            id: 'HDeW',
            type: 'last_edited_time',
            last_edited_time: '2022-10-12T04:19:00.000Z',
          },
          Likes: {
            id: 'H%7BcR',
            type: 'number',
            number: null,
          },
          SeoImage: {
            id: 'gtJL',
            type: 'files',
            files: [
              {
                name: 'https://res.cloudinary.com/jackieluc/image/upload/v1665380245/Personal%20Website/blog/Moving%20to%20USA%20for%20Work:%2010%20Tips%20for%20Canadians/stephen-plopper-UmEYn_GYqFo-unsplash_wwdwi5.jpg',
                type: 'external',
                external: {
                  url: 'https://res.cloudinary.com/jackieluc/image/upload/v1665380245/Personal%20Website/blog/Moving%20to%20USA%20for%20Work:%2010%20Tips%20for%20Canadians/stephen-plopper-UmEYn_GYqFo-unsplash_wwdwi5.jpg',
                },
              },
            ],
          },
          Tags: {
            id: 'lX%40N',
            type: 'multi_select',
            multi_select: [
              {
                id: '171c1fde-5f36-4117-b6cb-b40afdb5c5a8',
                name: 'lifestyle',
                color: 'gray',
              },
            ],
          },
          Category: {
            id: 'nPz%5D',
            type: 'select',
            select: {
              id: '0cddae1f-0916-4dff-8ff5-35a3c77a4d85',
              name: 'Lifestyle',
              color: 'green',
            },
          },
          LastUpdated: {
            id: 'q~%5Bg',
            type: 'date',
            date: {
              start: '2022-10-11',
              end: null,
              time_zone: null,
            },
          },
          Author: {
            id: 's%3FRm',
            type: 'created_by',
            created_by: {
              object: 'user',
              id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
              name: 'Jackie Luc',
              avatar_url:
                'https://s3-us-west-2.amazonaws.com/public.notion-static.com/9587c532-f806-4dc5-a76c-e63774e6512d/me.jpg',
              type: 'person',
              person: {
                email: 'jackieluc17@gmail.com',
              },
            },
          },
          SeoKeywords: {
            id: 'tFFI',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content:
                    'usa, united states, moving, canada, visa, immigration, relocation, moving, advice, tips, work, h1b, l1b, tn',
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
                plain_text:
                  'usa, united states, moving, canada, visa, immigration, relocation, moving, advice, tips, work, h1b, l1b, tn',
                href: null,
              },
            ],
          },
          Excerpt: {
            id: 'zuRf',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content:
                    'Who would’ve thought there were so many differences between the US and Canada? Take advantage and learn from our collection of tips as a result of hard lessons.',
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
                plain_text:
                  'Who would’ve thought there were so many differences between the US and Canada? Take advantage and learn from our collection of tips as a result of hard lessons.',
                href: null,
              },
            ],
          },
          Title: {
            id: 'title',
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: 'Moving to USA for Work: 10 Tips for Canadians',
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
                plain_text: 'Moving to USA for Work: 10 Tips for Canadians',
                href: null,
              },
            ],
          },
        },
        url: 'https://www.notion.so/Moving-to-USA-for-Work-10-Tips-for-Canadians-a460ac824c2c472c9c9ceb2c15567714',
      },
      {
        id: '2074d0b9-0d94-49db-8698-10f5443b295c',
        object: 'page',
        created_time: '2022-08-12T07:57:00.000Z',
        last_edited_time: '2022-09-12T08:04:00.000Z',
        created_by: {
          object: 'user',
          id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
        },
        last_edited_by: {
          object: 'user',
          id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
        },
        cover: null,
        icon: null,
        parent: {
          type: 'database_id',
          database_id: '1e3fc304-6d0e-4b83-9a79-be3b42232f97',
        },
        archived: false,
        properties: {
          Created: {
            id: '%3BIRW',
            type: 'created_time',
            created_time: '2022-08-12T07:57:00.000Z',
          },
          Views: {
            id: '%3Bkum',
            type: 'number',
            number: null,
          },
          PathOverride: {
            id: '%3FvG%3C',
            type: 'rich_text',
            rich_text: [],
          },
          Published: {
            id: '%40BgH',
            type: 'date',
            date: {
              start: '2018-07-25',
              end: null,
              time_zone: null,
            },
          },
          SeoImageAlt: {
            id: '%40GM%7D',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content: 'Leaderboard of CalgaryHacks 2018, with 1st place to the team "House Guard".',
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
                plain_text: 'Leaderboard of CalgaryHacks 2018, with 1st place to the team "House Guard".',
                href: null,
              },
            ],
          },
          Updated: {
            id: 'HDeW',
            type: 'last_edited_time',
            last_edited_time: '2022-09-12T08:04:00.000Z',
          },
          Likes: {
            id: 'H%7BcR',
            type: 'number',
            number: null,
          },
          SeoImage: {
            id: 'gtJL',
            type: 'files',
            files: [
              {
                name: 'https://res.cloudinary.com/jackieluc/image/upload/v1662273042/Personal%20Website/blog/how-we-won-our-first-24-hour-hackathon/main_sun7qs.png',
                type: 'external',
                external: {
                  url: 'https://res.cloudinary.com/jackieluc/image/upload/v1662273042/Personal%20Website/blog/how-we-won-our-first-24-hour-hackathon/main_sun7qs.png',
                },
              },
            ],
          },
          Tags: {
            id: 'lX%40N',
            type: 'multi_select',
            multi_select: [
              {
                id: '25bc53fe-f7c8-4d3e-8240-5a67c53dedb1',
                name: 'innovation',
                color: 'pink',
              },
              {
                id: 'e8737e46-f975-40c5-a1b2-5c070cf744fa',
                name: 'programming',
                color: 'orange',
              },
            ],
          },
          Category: {
            id: 'nPz%5D',
            type: 'select',
            select: {
              id: '6cf445f7-8795-4ddf-8f11-1299824d3cfb',
              name: 'Engineering',
              color: 'pink',
            },
          },
          LastUpdated: {
            id: 'q~%5Bg',
            type: 'date',
            date: null,
          },
          Author: {
            id: 's%3FRm',
            type: 'created_by',
            created_by: {
              object: 'user',
              id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
              name: 'Jackie Luc',
              avatar_url:
                'https://s3-us-west-2.amazonaws.com/public.notion-static.com/9587c532-f806-4dc5-a76c-e63774e6512d/me.jpg',
              type: 'person',
              person: {
                email: 'jackieluc17@gmail.com',
              },
            },
          },
          SeoKeywords: {
            id: 'tFFI',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content:
                    'hackathon, 24 hour hackathon, 24h hackathon, iot, internet of things, innovation, winning, first, first place',
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
                plain_text:
                  'hackathon, 24 hour hackathon, 24h hackathon, iot, internet of things, innovation, winning, first, first place',
                href: null,
              },
            ],
          },
          Excerpt: {
            id: 'zuRf',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content: 'Useful realizations and thoughts about our experience.',
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
                plain_text: 'Useful realizations and thoughts about our experience.',
                href: null,
              },
            ],
          },
          Title: {
            id: 'title',
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: 'How we won our first 24-hour hackathon',
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
                plain_text: 'How we won our first 24-hour hackathon',
                href: null,
              },
            ],
          },
        },
        url: 'https://www.notion.so/How-we-won-our-first-24-hour-hackathon-2074d0b90d9449db869810f5443b295c',
      },
      {
        object: 'page',
        id: '4eef4bc8-b3a6-4253-ae1c-fbabc8ef4925',
        created_time: '2022-07-25T06:10:00.000Z',
        last_edited_time: '2022-09-12T08:04:00.000Z',
        created_by: {
          object: 'user',
          id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
        },
        last_edited_by: {
          object: 'user',
          id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
        },
        cover: null,
        icon: null,
        parent: {
          type: 'database_id',
          database_id: '1e3fc304-6d0e-4b83-9a79-be3b42232f97',
        },
        archived: false,
        properties: {
          Created: {
            id: '%3BIRW',
            type: 'created_time',
            created_time: '2022-07-25T06:10:00.000Z',
          },
          Views: {
            id: '%3Bkum',
            type: 'number',
            number: null,
          },
          PathOverride: {
            id: '%3FvG%3C',
            type: 'rich_text',
            rich_text: [],
          },
          Published: {
            id: '%40BgH',
            type: 'date',
            date: {
              start: '2020-06-30',
              end: null,
              time_zone: null,
            },
          },
          SeoImageAlt: {
            id: '%40GM%7D',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content:
                    'A lithograph print by the Dutch artist M. C. Escher, titled "Relativity." It depicts a world in which the normal laws of gravity do not apply.',
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
                plain_text:
                  'A lithograph print by the Dutch artist M. C. Escher, titled "Relativity." It depicts a world in which the normal laws of gravity do not apply.',
                href: null,
              },
            ],
          },
          Updated: {
            id: 'HDeW',
            type: 'last_edited_time',
            last_edited_time: '2022-09-12T08:04:00.000Z',
          },
          Likes: {
            id: 'H%7BcR',
            type: 'number',
            number: null,
          },
          SeoImage: {
            id: 'gtJL',
            type: 'files',
            files: [
              {
                name: 'https://res.cloudinary.com/jackieluc/image/upload/v1662272602/Personal%20Website/blog/3-ways-to-end-burnout/main_brtrsq.png',
                type: 'external',
                external: {
                  url: 'https://res.cloudinary.com/jackieluc/image/upload/v1662272602/Personal%20Website/blog/3-ways-to-end-burnout/main_brtrsq.png',
                },
              },
            ],
          },
          Tags: {
            id: 'lX%40N',
            type: 'multi_select',
            multi_select: [
              {
                id: '49ecfccc-fa12-4f20-896b-dc98eb06648c',
                name: 'productivity',
                color: 'green',
              },
              {
                id: '1b0e7cdc-d922-47f2-9dec-4601338ebedd',
                name: 'self-improvement',
                color: 'yellow',
              },
            ],
          },
          Category: {
            id: 'nPz%5D',
            type: 'select',
            select: {
              id: 'd=az',
              name: 'Self-Improvement',
              color: 'default',
            },
          },
          LastUpdated: {
            id: 'q~%5Bg',
            type: 'date',
            date: null,
          },
          Author: {
            id: 's%3FRm',
            type: 'created_by',
            created_by: {
              object: 'user',
              id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
              name: 'Jackie Luc',
              avatar_url:
                'https://s3-us-west-2.amazonaws.com/public.notion-static.com/9587c532-f806-4dc5-a76c-e63774e6512d/me.jpg',
              type: 'person',
              person: {
                email: 'jackieluc17@gmail.com',
              },
            },
          },
          SeoKeywords: {
            id: 'tFFI',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content:
                    'burnout, end burnout, ways to end burnout, productivity, self improvement, self-improvement',
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
                plain_text:
                  'burnout, end burnout, ways to end burnout, productivity, self improvement, self-improvement',
                href: null,
              },
            ],
          },
          Excerpt: {
            id: 'zuRf',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content:
                    'As work and life blur more lines, it is now more important than ever to be aware of and identify burnout before it happens. But what do you do when it does? Identify your causes for burnout and discover 3 clear actions you can try to end your state of burnout.',
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
                plain_text:
                  'As work and life blur more lines, it is now more important than ever to be aware of and identify burnout before it happens. But what do you do when it does? Identify your causes for burnout and discover 3 clear actions you can try to end your state of burnout.',
                href: null,
              },
            ],
          },
          Title: {
            id: 'title',
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: '3 Ways to end burnout',
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
                plain_text: '3 Ways to end burnout',
                href: null,
              },
            ],
          },
        },
        url: 'https://www.notion.so/3-Ways-to-end-burnout-4eef4bc8b3a64253ae1cfbabc8ef4925',
      },
    ],
    next_cursor: null,
    has_more: false,
    type: 'page',
    page: {},
  } as any;

  if (env === 'development') {
    response.results.push({
      object: 'page',
      id: '546ba5e5-97a0-4ecc-9a5f-d883eb4c9c60',
      created_time: '2022-07-25T06:10:00.000Z',
      last_edited_time: '2022-08-24T07:16:00.000Z',
      created_by: {
        object: 'user',
        id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
      },
      last_edited_by: {
        object: 'user',
        id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
      },
      cover: null,
      icon: null,
      parent: {
        type: 'database_id',
        database_id: '1e3fc304-6d0e-4b83-9a79-be3b42232f97',
      },
      archived: false,
      properties: {
        Created: {
          id: '%3BIRW',
          type: 'created_time',
          created_time: '2022-07-25T06:10:00.000Z',
        },
        Views: {
          id: '%3Bkum',
          type: 'number',
          number: null,
        },
        PathOverride: {
          id: '%3FvG%3C',
          type: 'rich_text',
          rich_text: [],
        },
        Published: {
          id: '%40BgH',
          type: 'date',
          date: null,
        },
        SeoImageAlt: {
          id: '%40GM%7D',
          type: 'rich_text',
          rich_text: [],
        },
        Updated: {
          id: 'HDeW',
          type: 'last_edited_time',
          last_edited_time: '2022-08-24T07:16:00.000Z',
        },
        Likes: {
          id: 'H%7BcR',
          type: 'number',
          number: null,
        },
        SeoImage: {
          id: 'gtJL',
          type: 'files',
          files: [],
        },
        Tags: {
          id: 'lX%40N',
          type: 'multi_select',
          multi_select: [],
        },
        Category: {
          id: 'nPz%5D',
          type: 'select',
          select: null,
        },
        LastUpdated: {
          id: 'q~%5Bg',
          type: 'date',
          date: null,
        },
        Author: {
          id: 's%3FRm',
          type: 'created_by',
          created_by: {
            object: 'user',
            id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
            name: 'Jackie Luc',
            avatar_url:
              'https://s3-us-west-2.amazonaws.com/public.notion-static.com/9587c532-f806-4dc5-a76c-e63774e6512d/me.jpg',
            type: 'person',
            person: {
              email: 'jackieluc17@gmail.com',
            },
          },
        },
        SeoKeywords: {
          id: 'tFFI',
          type: 'rich_text',
          rich_text: [],
        },
        Excerpt: {
          id: 'zuRf',
          type: 'rich_text',
          rich_text: [],
        },
        Title: {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: 'Done is better than perfect',
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
              plain_text: 'Done is better than perfect',
              href: null,
            },
          ],
        },
      },
      url: 'https://www.notion.so/Done-is-better-than-perfect-546ba5e597a04ecc9a5fd883eb4c9c60',
    });
  }

  return response;
}

export function getAllPublishedBlogPostsMockResponse(env: 'development' | 'production'): Database {
  const pageIds = [
    'a460ac82-4c2c-472c-9c9c-eb2c15567714',
    '2074d0b9-0d94-49db-8698-10f5443b295c',
    '4eef4bc8-b3a6-4253-ae1c-fbabc8ef4925',
  ];

  if (env === 'development') {
    pageIds.push('546ba5e5-97a0-4ecc-9a5f-d883eb4c9c60');
  }
  return {
    pageIds,
    properties: {
      Created: {
        id: '%3BIRW',
        type: 'created_time',
        created_time: '2022-10-11T06:46:00.000Z',
      },
      Views: {
        id: '%3Bkum',
        type: 'number',
        number: null,
      },
      PathOverride: {
        id: '%3FvG%3C',
        type: 'rich_text',
        rich_text: [],
      },
      Published: {
        id: '%40BgH',
        type: 'date',
        date: {
          start: '2022-10-10',
          end: null,
          time_zone: null,
        },
      },
      SeoImageAlt: {
        id: '%40GM%7D',
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'A sunset landscape photo of Seattle’s skyline from Kerry Park with downtown on the left and Mount Rainier on the right in the distance.',
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
            plain_text:
              'A sunset landscape photo of Seattle’s skyline from Kerry Park with downtown on the left and Mount Rainier on the right in the distance.',
            href: null,
          },
        ],
      },
      Updated: {
        id: 'HDeW',
        type: 'last_edited_time',
        last_edited_time: '2022-10-12T04:19:00.000Z',
      },
      Likes: {
        id: 'H%7BcR',
        type: 'number',
        number: null,
      },
      SeoImage: {
        id: 'gtJL',
        type: 'files',
        files: [
          {
            name: 'https://res.cloudinary.com/jackieluc/image/upload/v1665380245/Personal%20Website/blog/Moving%20to%20USA%20for%20Work:%2010%20Tips%20for%20Canadians/stephen-plopper-UmEYn_GYqFo-unsplash_wwdwi5.jpg',
            type: 'external',
            external: {
              url: 'https://res.cloudinary.com/jackieluc/image/upload/v1665380245/Personal%20Website/blog/Moving%20to%20USA%20for%20Work:%2010%20Tips%20for%20Canadians/stephen-plopper-UmEYn_GYqFo-unsplash_wwdwi5.jpg',
            },
          },
        ],
      },
      Tags: {
        id: 'lX%40N',
        type: 'multi_select',
        multi_select: [
          {
            id: '171c1fde-5f36-4117-b6cb-b40afdb5c5a8',
            name: 'lifestyle',
            color: 'gray',
          },
        ],
      },
      Category: {
        id: 'nPz%5D',
        type: 'select',
        select: {
          id: '0cddae1f-0916-4dff-8ff5-35a3c77a4d85',
          name: 'Lifestyle',
          color: 'green',
        },
      },
      LastUpdated: {
        id: 'q~%5Bg',
        type: 'date',
        date: {
          start: '2022-10-11',
          end: null,
          time_zone: null,
        },
      },
      Author: {
        id: 's%3FRm',
        type: 'created_by',
        created_by: {
          object: 'user',
          id: '45e54770-ddc3-40ce-b5ee-1efaa1ef3371',
          name: 'Jackie Luc',
          avatar_url:
            'https://s3-us-west-2.amazonaws.com/public.notion-static.com/9587c532-f806-4dc5-a76c-e63774e6512d/me.jpg',
          type: 'person',
          person: {
            email: 'jackieluc17@gmail.com',
          },
        },
      },
      SeoKeywords: {
        id: 'tFFI',
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'usa, united states, moving, canada, visa, immigration, relocation, moving, advice, tips, work, h1b, l1b, tn',
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
            plain_text:
              'usa, united states, moving, canada, visa, immigration, relocation, moving, advice, tips, work, h1b, l1b, tn',
            href: null,
          },
        ],
      },
      Excerpt: {
        id: 'zuRf',
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Who would’ve thought there were so many differences between the US and Canada? Take advantage and learn from our collection of tips as a result of hard lessons.',
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
            plain_text:
              'Who would’ve thought there were so many differences between the US and Canada? Take advantage and learn from our collection of tips as a result of hard lessons.',
            href: null,
          },
        ],
      },
      Title: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'Moving to USA for Work: 10 Tips for Canadians',
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
            plain_text: 'Moving to USA for Work: 10 Tips for Canadians',
            href: null,
          },
        ],
      },
    } as NotionBlogProperties,
  };
}
