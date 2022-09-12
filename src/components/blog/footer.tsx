import PageLikes from '@/components/blog/pageLikes';
import { getSlugFromProperties } from '@/utils/getSlug';
import type { BlogProperties } from 'src/types/notion';

export default function BlogFooter({
  blogProperties,
}: {
  blogProperties: {
    properties: BlogProperties;
  };
}) {
  const { properties } = blogProperties;
  return (
    <section className='my-8'>
      <PageLikes slug={getSlugFromProperties(properties)} />
    </section>
  );
}
