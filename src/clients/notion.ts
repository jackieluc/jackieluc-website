import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
});

export default notion;

import {
  PageObjectResponse,
  GetPageResponse,
  GetPagePropertyResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionBlogProperties, Database } from 'src/types/notion';

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

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
    database_id: DATABASE_ID,
    page_size: 10,
    filter: {
      property: 'Published',
      date: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: 'Published',
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

export async function getHighestViewedBlogPosts(): Promise<any> {
  const database = await notion.databases.query({
    database_id: DATABASE_ID,
    page_size: 10,
    filter: {
      property: 'Published',
      date: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: 'Views',
        direction: 'descending',
      },
    ],
  });

  // TODO implement
}

export async function getHighestUpvotedBlogPosts(): Promise<any> {
  const database = await notion.databases.query({
    database_id: DATABASE_ID,
    page_size: 10,
    filter: {
      property: 'Published',
      date: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: 'Upvotes',
        direction: 'descending',
      },
    ],
  });

  // TODO implement
}
