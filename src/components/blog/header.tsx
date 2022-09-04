import Link from 'next/link';
import PageViews from '@/components/page-view';
import { getSlug, getSlugFromProperties } from '@/utils/getSlug';
import { getHumanReadableDate } from '@/utils/date';

import type { BlogProperties, NotionTag } from 'src/types/notion';

export default function BlogHeader({
  blogProperties,
}: {
  blogProperties: {
    properties: BlogProperties;
  };
}) {
  const { properties } = blogProperties;
  return (
    <section className='my-8'>
      <h1 className='mb-2'>{properties.title}</h1>
      <div className='flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8'>
        <div className='[&>p]:m-0 flex gap-4'>
          <p>{getHumanReadableDate(properties.published)}</p>
          <PageViews slug={getSlugFromProperties(blogProperties.properties)} />
        </div>
        {properties.tags.length > 0 ? (
          <ul className='[&>*]:m-0 [&>*]:p-0 m-0 flex list-none gap-2 p-0'>
            {properties.tags.map((tag: NotionTag) => (
              <li key={tag.name}>
                <Link
                  href={`/tags/${getSlug(tag.name)}`}
                  className='hover:text-secondary rounded-full bg-gray-200 px-4 py-2 text-xs text-gray-800 no-underline hover:bg-gray-300'
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
