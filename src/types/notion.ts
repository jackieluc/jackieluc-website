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

export enum BlockType {
  Paragraph = 'paragraph',
  Heading1 = 'heading_1',
  Heading2 = 'heading_2',
  Heading3 = 'heading_3',
  Callout = 'callout',
  Quote = 'quote',
  BulletedListItem = 'bulleted_list_item',
  NumberedListItem = 'numbered_list_item',
  ToDo = 'to_do',
  Toggle = 'toggle',
  Code = 'code',
  Image = 'image',
  Video = 'video',
  ChildPage = 'child_page',
  File = 'file',
  Pdf = 'pdf',
  Divider = 'divider',
}
