import buildAllAnchorLinks from '@/utils/notion/buildAllAnchorLinks';
import { anchorLinkNotionContent } from './mocks';
import * as notion from '@/clients/notion';
import { SpyInstance } from 'vitest';

describe('buildAllAnchorLinks utils', () => {
  let getBlockSpy: SpyInstance;

  beforeEach(() => {
    getBlockSpy = vi.spyOn(notion, 'getBlock').mockImplementation(() => anchorLinkNotionContent[1]);
  });

  it(`should convert Notion's "link to block" href to a web page's anchor link`, async () => {
    const result = await buildAllAnchorLinks(anchorLinkNotionContent);

    expect(getBlockSpy).toHaveBeenCalledOnce();
    expect(getBlockSpy).toHaveBeenCalledWith('699de7cd240c4cb890d07000052a0db1');
    expect(JSON.stringify(result)).contains('#4-def-456-ejklds');
  });
});
