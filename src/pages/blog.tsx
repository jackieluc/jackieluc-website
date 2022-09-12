import Head from 'next/head';
import BlogPostList from '@/components/blog/blogPostList';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import generateRSS from '@/utils/rss/generate';
import { NAME } from '@/config/constants';
import { DAY_AS_SECONDS } from '@/utils/blog/revalidate';

import { InferGetStaticPropsType } from 'next';

export default function Blog({ allBlogPostProperties }: InferGetStaticPropsType<typeof getStaticProps>) {
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
    revalidate: DAY_AS_SECONDS,
  };
}
