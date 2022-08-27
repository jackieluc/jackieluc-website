import Link from 'next/link';
import getSlug from '@/utils/getSlug';
import { BlogProperties, NotionTag } from 'src/types/notion';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import generateRSS from '@/utils/rss/generate';
import { getHumanReadableDate } from '@/utils/date';

export default function Blog({
  allBlogPostProperties,
}: {
  allBlogPostProperties: {
    properties: BlogProperties;
  }[];
}) {
  return (
    <main className='my-4 md:my-16'>
      <ul className='mx-auto grid max-w-prose gap-4 p-4'>
        {allBlogPostProperties.map(({ properties }: { properties: BlogProperties }) => {
          return (
            <li className='border-secondary rounded-md border-2' key={properties.title}>
              <Link href={`/blog/${getSlug(properties.title)}`}>
                <a className='flex flex-col gap-y-2 p-8 no-underline'>
                  <h2 className='text-xl font-bold'>{properties.title}</h2>
                  <p className='text-sm'>{properties.excerpt}</p>
                  <div className='flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8'>
                    <div className='[&>p]:m-0 flex gap-4'>
                      <p>{getHumanReadableDate(properties.published)}</p>
                      <p>{properties.views ?? 0} views</p>
                    </div>
                    {properties.tags.length > 0 ? (
                      <ul className='flex list-none'>
                        {properties.tags.map((tag: NotionTag) => (
                          <li
                            className='rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-800 no-underline'
                            key={tag.name}
                          >
                            {tag.name}
                          </li>
                        ))}
                      </ul>
                    ) : null}
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
