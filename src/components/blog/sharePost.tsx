import Link from 'next/link';
import { SITE_URL } from '@/config/constants';
import { getSlugFromProperties } from '@/utils/getSlug';
import { FaFacebook, FaHeart, FaLink, FaLinkedin, FaTwitter } from 'react-icons/fa';

import type { BlogProperties } from 'src/types/notion';

export default function SharePost({
  properties,
  showAlertFunc,
}: {
  properties: BlogProperties;
  showAlertFunc: Function;
}) {
  const slug = getSlugFromProperties(properties);
  const blogPostTitle = encodeURIComponent(properties.title);
  const blogPostUrl = encodeURI(`${SITE_URL}/blog/${slug}`);

  return (
    <div className='mx-auto mt-4 flex flex-col items-center gap-2 px-8'>
      <h3 className='text-primary my-2 flex items-center gap-2 text-sm font-normal'>
        <FaHeart size='1rem' /> share this post with your friends
      </h3>
      <div className='text-secondary flex justify-center gap-4'>
        <Link
          href={`https://twitter.com/intent/tweet?text=${blogPostTitle}&url=${blogPostUrl}`}
          title='share on Twitter'
        >
          <FaTwitter size='1.5rem' />
        </Link>
        <Link
          href={`https://www.linkedin.com/shareArticle?url=${blogPostUrl}&title=${blogPostTitle}&summary=&source=`}
          title='share on LinkedIn'
        >
          <FaLinkedin size='1.5rem' />
        </Link>
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${blogPostUrl}`} title='share on Facebook'>
          <FaFacebook size='1.5rem' />
        </Link>
        <button
          className='hover:text-primary'
          title='copy url to clipboard'
          onClick={async () => {
            copyUrlToClipboard(blogPostUrl);
            showAlertFunc(true);
          }}
        >
          <FaLink size='1.5rem' />
          <span className='sr-only'>copy url to clipboard</span>
        </button>
      </div>
    </div>
  );
}

async function copyUrlToClipboard(url: string) {
  navigator.clipboard.writeText(url);
}
