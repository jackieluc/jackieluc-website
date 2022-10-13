import * as notion from '@/clients/notion';
import * as mocks from './mocks';
import { SpyInstance } from 'vitest';

const BLOCK_ID = mocks.getBlockMockResponse().id;

describe('notion client', () => {
  let blockSpy: SpyInstance;


  describe('blocksSpy', () => {
    beforeEach(() => {
      blockSpy = vi
        .spyOn(notion.default.blocks, 'retrieve')
        .mockImplementation(() => Promise.resolve(mocks.getBlockMockResponse()));
    });

    it(`gets a block`, async () => {
      const block = await notion.getBlock(BLOCK_ID);
      expect(block).toEqual(mocks.getBlockMockResponse());
    });
  });
});
