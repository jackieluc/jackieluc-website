import getSlug from '@/utils/getSlug';
import Link from 'next/link';
import { BlogProperties, NotionTag } from 'src/types/notion';

export default function BlogHeader({
  blogPostProperties,
}: {
  blogPostProperties: {
    properties: BlogProperties;
  }[];
}) {
  return (
    <section>
      <ul>
        {blogPostProperties.map(({ properties }: { properties: BlogProperties }) => {
          return (
            <li className='cursor-pointer border-4 border-cyan-200 p-4' key={getSlug(properties.title)}>
              <Link href={`/${getSlug(properties.title)}`}>
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
                        <Link href={`/tags/${getSlug(tag.name)}`} key={getSlug(tag.name)}>
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
    </section>
  );
}
