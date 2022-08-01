import Link from 'next/link';
import parseProperty from '@/utils/notion/parseProperty';
import { getPageProperties } from '@/clients/notion';
import slugify from 'slugify';
import { getAllPublishedBlogPosts } from '@/clients/notion';
import { BlogProperties, NotionTag } from 'src/types/notion';

export default function Blog({
  blogPostProperties,
}: {
  blogPostProperties: {
    properties: BlogProperties;
  }[];
}) {
  return (
    <main className='grid h-screen place-items-center'>
      <h1>Hello blog</h1>
      <Link href='/'>what</Link>
      <div>
        <ul>
          {blogPostProperties.map(({ properties }) => {
            return (
              <li
                className='cursor-pointer border-4 border-cyan-200 p-4'
                key={slugify(properties.title).trim().toLocaleLowerCase()}
              >
                <Link href={`/${slugify(properties.title).trim().toLocaleLowerCase()}`}>
                  <div>
                    <h2 className='text-xl font-bold'>{properties.title}</h2>
                    <h3 className='text-md'>{properties.subtitle}</h3>
                    {properties.category ? (
                      <Link href={`/category/${slugify(properties.category).trim().toLowerCase()}`}>
                        <div className='rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300'>
                          {properties.category}
                        </div>
                      </Link>
                    ) : null}
                    {properties.tags.length > 0 ? (
                      <ul>
                        {properties.tags.map((tag: NotionTag) => (
                          <Link
                            href={`/tags/${slugify(tag.name).trim().toLowerCase()}`}
                            key={slugify(tag.name).trim().toLocaleLowerCase()}
                          >
                            <li className='max-w-fit rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-800 hover:bg-gray-300'>
                              {tag.name}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    ) : null}
                    <div>
                      <p>Views: {properties.views}</p>
                    </div>
                    <div>
                      <p>Upvotes: {properties.upvotes}</p>
                    </div>
                    <div>
                      <p>Published: {properties.published}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const { pageIds, properties } = await getAllPublishedBlogPosts();

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

  return {
    props: {
      blogPostProperties,
    },
  };
}
