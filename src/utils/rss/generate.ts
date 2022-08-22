import RSS from 'rss';
import { writeFileSync } from 'fs';
import getSlug from '@/utils/getSlug';
import { NAME, SITE_URL, SITE_DESCRIPTION } from '@/config/constants';
import { BlogProperties } from 'src/types/notion';

export default function generateRSS(allBlogPostProperties: { properties: BlogProperties }[]) {
  const feed = new RSS({
    title: NAME,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    language: 'en',
    pubDate: new Date(),
    webMaster: NAME,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  allBlogPostProperties.map(({ properties }: { properties: BlogProperties }) => {
    feed.item({
      title: properties.title,
      description: properties.subtitle,
      date: properties.published,
      url: `${SITE_URL}/${getSlug(properties.title)}`,
      categories: properties.tags.map((tag) => tag.name),
      author: properties.author,
    });
  });

  writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
