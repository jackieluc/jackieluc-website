import { BlogProperties } from 'src/types/notion';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface SlugParams {
  params: {
    slug: string;
  };
}

export interface TagParams {
  params: {
    tag: string;
  };
}

export interface BlogPostParams {
  slug: string;
  blogProperties: {
    properties: BlogProperties;
  }[];
  tableOfContents: TableOfContent[];
  content: BlockObjectResponse[];
}

export interface TableOfContent {
  title: string;
  url: string;
  children?: TableOfContent[];
}
