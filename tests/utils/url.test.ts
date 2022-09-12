import { describe, it, expect } from 'vitest';
import { getBlogPostUrl } from '@/utils/url';

describe('url utils', () => {
  it('gets the blog post url', () => {
    expect(getBlogPostUrl('abc')).toEqual('https://jackieluc.com/blog/abc');
  });
});
