import Link from 'next/link';
import getSlug from '@/utils/getSlug';
import { BlogProperties, NotionTag } from 'src/types/notion';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import generateRSS from '@/utils/rss/generate';

export default function Blog({
  allBlogPostProperties,
}: {
  allBlogPostProperties: {
    properties: BlogProperties;
  }[];
}) {
  return (
    <main className='mt-16'>
      <ul className='mx-auto grid max-w-prose gap-4'>
        {allBlogPostProperties.map(({ properties }: { properties: BlogProperties }) => {
          return (
            <li className='border-secondary rounded-md border-2 p-8' key={getSlug(properties.title)}>
              <Link href={`/blog/${getSlug(properties.title)}`}>
                <a className='flex flex-col gap-y-2 no-underline'>
                  <h2 className='text-xl font-bold'>{properties.title}</h2>
                  <h3 className='text-md'>{properties.subtitle}</h3>
                  {properties.tags.length > 0 ? (
                    <ul className='flex'>
                      {properties.tags.map((tag: NotionTag) => (
                        <li
                          className='max-w-fit rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-800'
                          key={getSlug(tag.name)}
                        >
                          {tag.name}
                        </li>
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
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const allBlogPostProperties = await getBlogPostProperties();

  generateRSS(allBlogPostProperties);

  return {
    props: {
      allBlogPostProperties,
    },
    // TODO: add revalidate for every day
  };
}
