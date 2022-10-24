import Link from 'next/link';
import Image from 'next/future/image';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { CgArrowRight } from 'react-icons/cg';
import BlogPostList from '@/components/blog/blogPostList';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import { DAY_AS_SECONDS } from '@/utils/blog/revalidate';

import { InferGetStaticPropsType } from 'next';

export default function Home({ recentBlogPostProperties }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className='mx-auto py-16 md:grid'>
      <header className='prose mx-auto px-8'>
        <div className='flex flex-col items-center gap-8 md:flex-row'>
          <div className='md:w-1/2'>
            <Image
              className='ring-secondary m-0 w-32 rounded-full object-cover ring-2 md:ml-auto'
              src='/me.jpg'
              width='512'
              height='512'
              loading='eager'
              alt={`Jackie Luc's profile picture.`}
            />
          </div>
          <h1 className='text-secondary mb-0 px-4 text-center md:px-0 md:text-left lg:px-6'>
            software engineer, learn-it-all, punthusiast.
          </h1>
        </div>
        <div className='md:px-8 lg:px-16'>
          <p>
            I'm Jackie, a software engineer and a life-long learner currently based in Seattle. I enjoy being curious
            about the world and building solutions that magnify the impact of other people. Let's be a little nicer to
            each other, we're all just trying our best.
          </p>
          <div className='flex gap-4'>
            <Link href='https://github.com/jackieluc' target='_blank' title='GitHub' aria-label='GitHub'>
              <FaGithub size='1.5rem' />
            </Link>
            <Link href='https://linkedin.com/in/jackieluc' target='_blank' title='LinkedIn' aria-label='LinkedIn'>
              <FaLinkedin size='1.5rem' />
            </Link>
            <Link href='https://twitter.com/jackiesthinking' target='_blank' title='Twtitter' aria-label='Twitter'>
              <FaTwitter size='1.5rem' />
            </Link>
          </div>
        </div>
      </header>
      <div className='mt-8 flex max-w-prose flex-col gap-8 px-4 md:mx-auto md:p-8'>
        <h2 className='text-secondary text-2xl font-bold'>latest posts</h2>
        <BlogPostList blogPostProperties={recentBlogPostProperties} />
        <Link href='/blog' className='flex items-center justify-center no-underline hover:underline'>
          <span className='flex'>
            see all posts <CgArrowRight size='1.5rem' />
          </span>
        </Link>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const recentBlogPostProperties = await getBlogPostProperties({ length: 3 });

  return {
    props: {
      recentBlogPostProperties,
    },
    revalidate: DAY_AS_SECONDS,
  };
}
