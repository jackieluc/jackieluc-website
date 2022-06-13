import Markdoc, { RenderableTreeNode } from '@markdoc/markdoc';
import fs from 'fs';
import path from 'path';
import React from 'react';

import Callout from '~/components/markdoc/tags/callout';

const tags = {
  callout: {
    render: 'Callout',
    attributes: {},
  },
};

/**
 * Builds the blog post markdoc as a markdoc content
 * @param file Blog post file name
 * @returns RenderableTreeNode - the content to be rendered by markdoc
 */
export function buildMarkdocContent(file: string): RenderableTreeNode {
  let blogPostPath = path.join(__dirname, '..', 'app', 'blog-posts', file);
  const markdoc = fs.readFileSync(blogPostPath, 'utf8');

  const ast = Markdoc.parse(markdoc);
  const content = Markdoc.transform(ast, { tags });
  return content;
}

/**
 * Renders the markdoc content on the client side. Cannot run this on the server.
 * @param content The markdoc content to render
 * @returns React.ReactNode - the actual React-rendered component
 */
export function renderMarkdoc(content: RenderableTreeNode): React.ReactNode {
  return Markdoc.renderers.react(content, React, {
    components: {
      Callout: Callout,
    },
  });
}
