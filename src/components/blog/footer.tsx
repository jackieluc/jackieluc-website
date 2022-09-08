import { getSlugFromProperties } from '@/utils/getSlug';
import type { BlogProperties } from 'src/types/notion';
import PageLikes from '../likes-view';

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
