import * as notion from '@/clients/notion';
import * as mocks from './mocks';
import { SpyInstance } from 'vitest';
import { BlogPropertyKeys } from 'src/types/notion';

describe('notion client', () => {
  let pageSpy: SpyInstance;
  let blockSpy: SpyInstance;
  let querySpy: SpyInstance;

  describe('getPage', () => {
    beforeEach(() => {
      pageSpy = vi
        .spyOn(notion.default.pages, 'retrieve')
        .mockImplementation(() => Promise.resolve(mocks.getPageMockResponse()));
    });

    it(`gets a notion page`, async () => {
      const pageId = mocks.getPageMockResponse().id;
      const page = await notion.getPage(pageId);

      expect(pageSpy).toHaveBeenCalledWith({
        page_id: pageId,
      });
      expect(page).toEqual(mocks.getPageMockResponse());
    });
  });

  describe('getPageProperty', () => {
    beforeEach(() => {
      pageSpy = vi
        .spyOn(notion.default.pages.properties, 'retrieve')
        .mockImplementation(() => Promise.resolve(mocks.getPagePropertyMockResponse()));
    });

    it(`gets a notion page property`, async () => {
      const pageId = 'mock page id';
      const propertyId = 'kjP0';
      const pageProperty = await notion.getPageProperty(pageId, propertyId);

      expect(pageSpy).toHaveBeenCalledWith({
        page_id: pageId,
        property_id: propertyId,
      });
      expect(pageProperty).toEqual(mocks.getPagePropertyMockResponse());
    });
  });

  describe('getPageProperties', () => {
    beforeEach(() => {
      pageSpy = vi
        .spyOn(notion.default.pages.properties, 'retrieve')
        .mockImplementation(() => Promise.resolve(mocks.getPagePropertyMockResponse()));
    });

    it(`gets notion page properties`, async () => {
      const pageId = 'mock page id';
      const propertyIds = ['kjP0', 'mock id1', 'mock id2'];
      const pageProperties = await notion.getPageProperties(pageId, propertyIds);

      expect(pageSpy).toHaveBeenCalledTimes(3);
      expect(pageProperties).toEqual(Array(3).fill(mocks.getPagePropertyMockResponse()));
    });
  });

  describe('getBlock', () => {
    beforeEach(() => {
      blockSpy = vi
        .spyOn(notion.default.blocks, 'retrieve')
        .mockImplementation(() => Promise.resolve(mocks.getBlockMockResponse()));
    });

    it(`gets a notion block`, async () => {
      const blockId = mocks.getBlockMockResponse().id;
      const block = await notion.getBlock(blockId);

      expect(blockSpy).toHaveBeenCalledWith({
        block_id: blockId,
      });
      expect(block).toEqual(mocks.getBlockMockResponse());
    });
  });

  describe('getBlocks', () => {
    beforeEach(() => {
      blockSpy = vi
        .spyOn(notion.default.blocks.children, 'list')
        .mockImplementation(() => Promise.resolve(mocks.getBlocksMockResponse()));
    });

    it(`gets notion blocks`, async () => {
      const blockId = mocks.getBlocksMockResponse().results[0].id;
      const blocks = await notion.getBlocks(blockId);

      expect(blockSpy).toHaveBeenCalledWith({
        block_id: blockId,
        page_size: 100,
        undefined,
      });
      expect(blocks).toEqual(mocks.getBlocksMockResponse());
    });
  });

  describe('getAllPublishedBlogPosts', () => {
    beforeEach(() => {
      querySpy = vi.spyOn(notion.default.databases, 'query');

      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it(`prod - gets posts filtered by Published date and sorted by most recent`, async () => {
      querySpy.mockImplementation(() => Promise.resolve(mocks.getDatabaseQueryMockResponse('production')));

      // @ts-ignore
      process.env.NODE_ENV = 'production';

      const { pageIds, properties } = await notion.getAllPublishedBlogPosts();

      expect(process.env.NODE_ENV).toEqual('production');
      expect(querySpy).toHaveBeenCalledWith({
        database_id: process.env.NOTION_BLOG_DATABASE_ID,
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
              property: BlogPropertyKeys.Published,
              date: {
                on_or_before: new Date().toISOString(),
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

      expect(pageIds).toEqual(mocks.getAllPublishedBlogPostsMockResponse('production').pageIds);
      expect(properties).toEqual(mocks.getAllPublishedBlogPostsMockResponse('production').properties);
    });

    it(`dev - gets all blog posts including draft posts`, async () => {
      querySpy.mockImplementation(() => Promise.resolve(mocks.getDatabaseQueryMockResponse('development')));

      // @ts-ignore
      process.env.NODE_ENV = 'development';

      const { pageIds, properties } = await notion.getAllPublishedBlogPosts();

      expect(process.env.NODE_ENV).toEqual('development');
      expect(querySpy).toHaveBeenCalledWith({
        database_id: process.env.NOTION_BLOG_DATABASE_ID,
        page_size: 50,
        sorts: [
          {
            property: BlogPropertyKeys.Updated,
            direction: 'descending',
          },
        ],
      });

      expect(pageIds).toEqual(mocks.getAllPublishedBlogPostsMockResponse('development').pageIds);
      expect(properties).toEqual(mocks.getAllPublishedBlogPostsMockResponse('development').properties);
    });
  });

  describe('getAllBlogPostTags', () => {
    beforeEach(() => {
      querySpy = vi
        .spyOn(notion.default.databases, 'query')
        .mockImplementation(() => Promise.resolve(mocks.getDatabaseQueryMockResponse('production')));
    });

    it(`gets all published blog post tags`, async () => {
      const { pageIds, properties } = await notion.getAllBlogPostTags();

      expect(querySpy).toHaveBeenCalledWith({
        database_id: process.env.NOTION_BLOG_DATABASE_ID,
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
      expect(pageIds).toEqual(mocks.getAllPublishedBlogPostsMockResponse('production').pageIds);
      expect(properties).toEqual(mocks.getAllPublishedBlogPostsMockResponse('production').properties);
    });
  });
});
