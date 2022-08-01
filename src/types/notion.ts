export enum BlogPropertyKeys {
  Title = 'Title',
  Subtitle = 'Subtitle',
  Category = 'Category',
  Tags = 'Tags',
  Views = 'Views',
  Upvotes = 'Upvotes',
  Published = 'Published',
  Created = 'Created',
  Updated = 'Updated',
  Author = 'Author',
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
  subtitle: string;
  category: string;
  tags: NotionTag[];
  views: string;
  upvotes: string;
  published: string;
  created?: string;
  updated?: string;
  author?: string;
};
