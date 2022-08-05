import { getAllPublishedBlogPosts, getPageProperties } from '@/clients/notion';
import parseProperty from './parseProperty';
import { BlogProperties } from 'src/types/notion';

/**
 * Get all blog post properties unless a pageId is provided to get one blog post's properties. Properties include title, subtitle, category, tags, views, upvotes, published date.
 *
 * @param pageId get a specific page's blog post property
 * @returns blogPostProperties (ie. title, subtitle, category, tags, views, upvotes, published date)
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
        properties.Subtitle.id,
        properties.Category.id,
        properties.Tags.id,
        properties.Views.id,
        properties.Upvotes.id,
        properties.Published.id,
      ])
    )
  );

  let blogPostProperties: { properties: BlogProperties }[] = [];
  pageIds.forEach((_, index) => {
    let [title, subtitle, category, tags, views, upvotes, published] = metadata[index];

    const mappedProperties: BlogProperties = {
      title: parseProperty(title),
      subtitle: parseProperty(subtitle),
      category: parseProperty(category),
      tags: JSON.parse(parseProperty(tags)),
      views: parseProperty(views),
      upvotes: parseProperty(upvotes),
      published: parseProperty(published),
    };

    blogPostProperties.push({
      properties: mappedProperties,
    });
  });

  return blogPostProperties;
}
