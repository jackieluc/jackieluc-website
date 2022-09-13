import LikeButton from '@/components/blog/likeButton';
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
      <LikeButton slug={getSlugFromProperties(properties)} />
    </section>
  );
}
