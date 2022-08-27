import getSlug from '@/utils/getSlug';
import Link from 'next/link';
import { getHumanReadableDate } from '@/utils/date';
import { BlogProperties, NotionTag } from 'src/types/notion';

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
          <p>{properties.views ?? 0} views</p>
        </div>
        {properties.tags.length > 0 ? (
          <ul className='[&>*]:m-0 [&>*]:p-0 m-0 flex list-none p-0'>
            {properties.tags.map((tag: NotionTag) => (
              <li key={tag.name}>
                <Link href={`/tags/${getSlug(tag.name)}`}>
                  <a className='hover:text-secondary max-w-fit rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-800 no-underline hover:bg-gray-200'>
                    {tag.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
