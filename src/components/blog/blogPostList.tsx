import Link from 'next/link';
import PageViews from '@/components/page-view';
import { getSlugFromProperties } from '@/utils/getSlug';
import { getHumanReadableDate } from '@/utils/date';

import type { BlogProperties, NotionTag } from 'src/types/notion';

export default function BlogPostList({
  blogPostProperties,
}: {
  blogPostProperties: {
    properties: BlogProperties;
  }[];
}) {
  return (
    <ul className='grid list-none gap-4'>
      {blogPostProperties.map(({ properties }: { properties: BlogProperties }) => {
        return (
          <li
            className='border-secondary rounded-md border-2 transition ease-in-out hover:translate-x-4 hover:-translate-y-2'
            key={properties.title}
          >
            <Link href={`/blog/${getSlugFromProperties(properties)}`} className='no-underline'>
              <div className='flex flex-col gap-y-2 p-8'>
                <h2 className='text-xl font-bold'>{properties.title}</h2>
                <p className='text-primary text-sm font-normal'>{properties.excerpt}</p>
                <div className='text-primary flex flex-col items-start gap-2 font-normal md:flex-row md:items-center md:gap-8'>
                  <div className='[&>p]:m-0 text-secondary flex gap-4 text-sm'>
                    <p>{getHumanReadableDate(properties.published)}</p>
                    <PageViews slug={getSlugFromProperties(properties)} />
                  </div>
                  {properties.tags.length > 0 ? (
                    <ul className='flex list-none flex-wrap gap-2'>
                      {properties.tags.map((tag: NotionTag) => (
                        <li
                          className='text-secondary min-w-fit rounded-full bg-gray-200 px-4 py-2 text-xs no-underline'
                          key={tag.name}
                        >
                          {tag.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
