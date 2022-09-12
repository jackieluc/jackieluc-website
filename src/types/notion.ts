export enum BlogPropertyKeys {
  Title = 'Title',
  PathOverride = 'PathOverride',
  Excerpt = 'Excerpt',
  Category = 'Category',
  Tags = 'Tags',
  Published = 'Published',
  Created = 'Created',
  Updated = 'Updated',
  Author = 'Author',
  SeoImage = 'SeoImage',
  SeoImageAlt = 'SeoImageAlt',
  SeoKeyWords = 'SeoKeywords',
}

export interface Database {
  pageIds: string[];
  properties: NotionBlogProperties;
}

export type NotionBlogProperties = Record<BlogPropertyKeys, { id: string }>;

export interface NotionTag {
  id: string;
  name: string;
  color: string;
}

export type BlogProperties = {
  title: string;
  pathoverride?: string;
  excerpt: string;
  category: string;
  tags: NotionTag[];
  published: string;
  created?: string;
  updated?: string;
  author?: string;
  seoimage: string;
  seoimagealt: string;
  seokeywords: string;
};

export interface FilterBlogPostProperties {
  pageId?: string;
  length?: number;
}
