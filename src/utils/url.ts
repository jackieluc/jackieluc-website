import { SITE_URL } from '@/config/constants';

export function getBlogPostUrl(slug: string) {
  const blogUrl = new URL('/blog/', SITE_URL);
  const blogPostUrl = new URL(slug, blogUrl);

  return blogPostUrl.href;
}
