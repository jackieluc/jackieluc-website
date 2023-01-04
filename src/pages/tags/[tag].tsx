import Head from 'next/head';
import BlogPostList from '@/components/blog/blogPostList';
import getBlogPostProperties from '@/utils/notion/getBlogPostProperties';
import { getAllBlogPostTags, getPageProperties } from '@/clients/notion';
import { NAME } from '@/config/constants';
import { DAY_AS_SECONDS } from '@/utils/blog/revalidate';
import parseProperty from '@/utils/notion/parseProperty';

import type { InferGetStaticPropsType } from 'next';
import type { TagParams } from 'src/types/next';
import type { NotionTag } from 'src/types/notion';

export default function Tag({ tag, blogPostProperties }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>
          {tag} | {NAME}
        </title>
      </Head>
      <main className='my-4 mx-auto mb-16 max-w-prose p-4 md:mt-8'>
        <h1 className='text-secondary mb-8 text-3xl font-bold'>latest posts for {tag}</h1>
        <BlogPostList blogPostProperties={blogPostProperties} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { pageIds, properties } = await getAllBlogPostTags();

  const metadata = await Promise.all(
    pageIds.map((pageId: string) => {
      return getPageProperties(pageId, [properties.Tags.id]);
    })
  );

  const paths: TagParams[] = [];

  pageIds.forEach((_, index) => {
    let [tags] = metadata[index];
    const parsedTags: NotionTag[] = JSON.parse(parseProperty(tags));

    parsedTags.forEach((tag) => {
      paths.push({
        params: {
          tag: tag.name,
        },
      });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { tag } }: TagParams) {
  const { pageIds, properties: notionProperties } = await getAllBlogPostTags();

  const metadata = await Promise.all(
    pageIds.map((pageId: string) => {
      return getPageProperties(pageId, [notionProperties.Tags.id]);
    })
  );

  const pageIdsWithTag = pageIds.filter((_, index) => {
    const [tags] = metadata[index];
    const parsedTags: NotionTag[] = JSON.parse(parseProperty(tags));
    return parsedTags.some((parsedTag) => parsedTag.name === tag);
  });

  if (pageIdsWithTag.length === 0) {
    return {
      notFound: true,
    };
  }

  const properties = await (
    await Promise.all(pageIdsWithTag.map((pageId) => getBlogPostProperties({ pageId })))
  ).flat();

  return {
    props: {
      tag,
      blogPostProperties: properties,
    },
    revalidate: DAY_AS_SECONDS,
  };
}
