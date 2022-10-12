import Link from 'next/link';
import PageViews from '@/components/blog/pageViews';
import { getSlugFromProperties } from '@/utils/getSlug';
import { getHumanReadableDate } from '@/utils/date';

import type { BlogProperties, NotionTag } from 'src/types/notion';
import PageLikes from './pageLikes';

export default function BlogPostList({
  blogPostProperties,
}: {
  blogPostProperties: {
    properties: BlogProperties;
  }[];
}) {
  return (
    <ul className='grid list-none gap-6'>
      {blogPostProperties.map(({ properties }: { properties: BlogProperties }) => {
        return (
          <li className='relative' key={properties.title}>
            <Link href={`/blog/${getSlugFromProperties(properties)}`} className='no-underline'>
              <>
                <span className='border-secondary absolute inset-0 rounded-md border-2 border-dashed'></span>
                <div className='border-secondary relative rounded-md border-2 p-8 transition ease-in-out hover:translate-x-4 hover:-translate-y-2'>
                  <div className='flex flex-col gap-y-2'>
                    <h2 className='text-xl font-bold'>{properties.title}</h2>
                    <p className='text-primary text-sm font-normal'>{properties.excerpt}</p>
                    <div className='text-primary flex flex-col items-start gap-2 font-normal md:flex-row md:items-center md:gap-8'>
                      <div className='[&>p]:m-0 text-secondary flex gap-4 text-sm'>
                        <p>{getHumanReadableDate(properties.published)}</p>
                        <PageViews slug={getSlugFromProperties(properties)} />
                        <PageLikes slug={getSlugFromProperties(properties)} />
                      </div>
                      {properties.tags.length > 0 ? (
                        <ul className='flex list-none flex-wrap gap-2'>
                          {properties.tags.map((tag: NotionTag) => (
                            <li
                              className='text-secondary bg-neutral min-w-fit rounded-full px-4 py-2 text-xs'
                              key={tag.name}
                            >
                              {tag.name}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
