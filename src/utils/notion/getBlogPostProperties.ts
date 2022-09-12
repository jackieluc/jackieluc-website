import { getAllPublishedBlogPosts, getPageProperties } from '@/clients/notion';
import parseProperty from '@/utils/notion/parseProperty';

import type { BlogProperties, FilterBlogPostProperties } from 'src/types/notion';

/**
 * Get all blog post properties unless a filter is provided to get one blog post's properties or a shortlist of blog post properties.
 * Properties include title, excerpt, category, tags, published date.
 *
 * @param filter filter on how many blog post properties can be returned
 * @returns list of blogPostProperties (ie. title, excerpt, category, tags, published date)
 */
export default async function getBlogPostProperties(
  filter?: FilterBlogPostProperties
): Promise<{ properties: BlogProperties }[]> {
  let { pageIds, properties } = await getAllPublishedBlogPosts();

  let numberOfBlogPosts = pageIds.length;

  if (filter?.pageId) {
    // override to get a single blog post's properties
    pageIds = [filter.pageId];
  } else if (filter?.length && filter.length > 0) {
    // override the number of blog post properties to fetch and parse
    numberOfBlogPosts = filter.length;
  }

  const filteredPageIds = pageIds.slice(0, numberOfBlogPosts);

  const metadata = await Promise.all(
    filteredPageIds.map((pageId: string) =>
      getPageProperties(pageId, [
        properties.Title.id,
        properties.PathOverride.id,
        properties.Excerpt.id,
        properties.Category.id,
        properties.Tags.id,
        properties.Published.id,
        properties.SeoImage.id,
        properties.SeoImageAlt.id,
        properties.SeoKeywords.id,
      ])
    )
  );

  let blogPostProperties: { properties: BlogProperties }[] = [];
  filteredPageIds.forEach((_, index) => {
    let [title, pathoverride, excerpt, category, tags, published, seoimage, seoimagealt, seokeywords] = metadata[index];

    const mappedProperties: BlogProperties = {
      title: parseProperty(title),
      pathoverride: parseProperty(pathoverride),
      excerpt: parseProperty(excerpt),
      category: parseProperty(category),
      tags: JSON.parse(parseProperty(tags)),
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
