import { getAllPublishedBlogPosts, getPageProperties } from '@/clients/notion';
import parseProperty from './parseProperty';

import type { BlogProperties } from 'src/types/notion';

/**
 * Get all blog post properties unless a pageId is provided to get one blog post's properties. Properties include title, excerpt, category, tags, views, upvotes, published date.
 *
 * @param pageId get a specific page's blog post property
 * @returns blogPostProperties (ie. title, excerpt, category, tags, views, upvotes, published date)
 */
export default async function getBlogPostProperties(pageId?: string): Promise<{ properties: BlogProperties }[]> {
  let { pageIds, properties } = await getAllPublishedBlogPosts();

  // if pageId exists, we want to override the list of pageIds and get blog post properties for one blog post
  if (pageId) {
    pageIds = [pageId];
  }

  const metadata = await Promise.all(
    pageIds.map((pageId: string) =>
      getPageProperties(pageId, [
        properties.Title.id,
        properties.PathOverride.id,
        properties.Excerpt.id,
        properties.Category.id,
        properties.Tags.id,
        properties.Views.id,
        properties.Upvotes.id,
        properties.Published.id,
        properties.SeoImage.id,
        properties.SeoImageAlt.id,
        properties.SeoKeywords.id,
      ])
    )
  );

  let blogPostProperties: { properties: BlogProperties }[] = [];
  pageIds.forEach((_, index) => {
    let [title, pathoverride, excerpt, category, tags, views, upvotes, published, seoimage, seoimagealt, seokeywords] =
      metadata[index];

    const mappedProperties: BlogProperties = {
      title: parseProperty(title),
      pathoverride: parseProperty(pathoverride),
      excerpt: parseProperty(excerpt),
      category: parseProperty(category),
      tags: JSON.parse(parseProperty(tags)),
      views: parseProperty(views),
      upvotes: parseProperty(upvotes),
      published: parseProperty(published),
      seoimage: parseProperty(seoimage),
      seoimagealt: parseProperty(seoimagealt),
      seokeywords: parseProperty(seokeywords),
    };

    blogPostProperties.push({
      properties: mappedProperties,
    });
  });

  return blogPostProperties;
}
