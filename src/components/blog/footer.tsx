import LikeButton from '@/components/blog/likeButton';
import SharePost from '@/components/blog/sharePost';
import { getSlugFromProperties } from '@/utils/getSlug';
import type { BlogProperties } from 'src/types/notion';

export default function BlogFooter({
  blogProperties,
  showAlertFunc,
}: {
  blogProperties: {
    properties: BlogProperties;
  };
  showAlertFunc: Function;
}) {
  const { properties } = blogProperties;
  return (
    <section className='mt-8 mb-8 xl:mt-4'>
      <LikeButton slug={getSlugFromProperties(properties)} />
      <SharePost properties={properties} showAlertFunc={showAlertFunc} />
    </section>
  );
}
