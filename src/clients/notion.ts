import { Client } from '@notionhq/client';
import { BlogPropertyKeys } from 'src/types/notion';

import type {
  PageObjectResponse,
  GetPageResponse,
  GetPagePropertyResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { NotionBlogProperties, Database } from 'src/types/notion';

const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
});

export default notion;

const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID as string;

export async function getPage(page_id: string): Promise<GetPageResponse> {
  const pages = await notion.pages.retrieve({ page_id });

  return pages;
}

export async function getPageProperty(page_id: string, property_id: string): Promise<GetPagePropertyResponse> {
  const property = notion.pages.properties.retrieve({ page_id, property_id });

  return property;
}
export async function getPageProperties(page_id: string, propertyIds: string[]): Promise<GetPagePropertyResponse[]> {
  const pageProperties = await Promise.all(
    propertyIds.map((propertyId: string) => getPageProperty(page_id, propertyId))
  );

  return pageProperties;
}

export async function getBlocks(block_id: string, start_cursor?: string): Promise<ListBlockChildrenResponse> {
  const blocks = await notion.blocks.children.list({
    block_id,
    page_size: 100,
    start_cursor,
  });

  return blocks;
}

export async function getAllPublishedBlogPosts(): Promise<Database> {
  const database = await notion.databases.query({
    database_id: BLOG_DATABASE_ID,
    page_size: 50,
    filter: {
      property: BlogPropertyKeys.Published,
      date: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: BlogPropertyKeys.Published,
        direction: 'descending',
      },
    ],
  });

  const pageIds: string[] = database.results.map((result: any) => result.id);
  const properties = (database.results[0] as PageObjectResponse).properties as NotionBlogProperties;

  return {
    pageIds,
    properties,
  };
}

export async function getAllBlogPostTags(): Promise<Database> {
  const database = await notion.databases.query({
    database_id: BLOG_DATABASE_ID,
    page_size: 50,
    filter: {
      and: [
        {
          property: BlogPropertyKeys.Published,
          date: {
            is_not_empty: true,
          },
        },
        {
          property: BlogPropertyKeys.Tags,
          multi_select: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: BlogPropertyKeys.Published,
        direction: 'descending',
      },
    ],
  });

  const pageIds: string[] = database.results.map((result: any) => result.id);
  const properties = (database.results[0] as PageObjectResponse).properties as NotionBlogProperties;

  return {
    pageIds,
    properties,
  };
}
