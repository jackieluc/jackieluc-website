import RSS from 'rss';
import { getBlogPostUrl } from '@/utils/url';
import { writeFileSync } from 'fs';
import { getSlugFromProperties } from '@/utils/getSlug';
import { NAME, SITE_URL, SITE_DESCRIPTION } from '@/config/constants';
import type { BlogProperties } from 'src/types/notion';

export default function generateRSS(allBlogPostProperties: { properties: BlogProperties }[]) {
  const feed = new RSS({
    title: NAME,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: new URL('/rss.xml', SITE_URL).href,
    language: 'en',
    pubDate: new Date(),
    webMaster: NAME,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  allBlogPostProperties.forEach(({ properties }: { properties: BlogProperties }) => {
    feed.item({
      title: properties.title,
      description: properties.excerpt,
      date: properties.published,
      url: getBlogPostUrl(getSlugFromProperties(properties)),
      categories: properties.tags.map((tag) => tag.name),
      author: properties.author,
    });
  });

  writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
