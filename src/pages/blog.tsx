import Head from 'next/head';
import BlogPostList from '@/components/blog/blogPostList';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import generateRSS from '@/utils/rss/generate';

import type { BlogProperties } from 'src/types/notion';
import { NAME } from '@/config/constants';

export default function Blog({
  allBlogPostProperties,
}: {
  allBlogPostProperties: {
    properties: BlogProperties;
  }[];
}) {
  return (
    <>
      <Head>
        <title>blog | {NAME}</title>
      </Head>
      <main className='my-4 mx-auto mb-16 max-w-prose p-4 md:mt-8'>
        <h1 className='text-secondary mb-8 text-3xl font-bold'>latest posts</h1>
        <BlogPostList blogPostProperties={allBlogPostProperties} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allBlogPostProperties = await getBlogPostProperties();

  generateRSS(allBlogPostProperties);

  return {
    props: {
      allBlogPostProperties,
    },
    // TODO: add revalidate for every day
  };
}
