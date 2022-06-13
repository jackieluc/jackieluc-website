import Markdoc from '@markdoc/markdoc';
import fs from 'fs';
import path from 'path';

const tags = {
  callout: {
    render: 'Callout',
    attributes: {},
  },
};

export default function renderMarkdoc(file: string) {
  let blogPath = path.join(__dirname, '../app/blog-posts');
  let fullPath = path.resolve(`${blogPath}/${file}`);
  const markdoc = fs.readFileSync(fullPath, 'utf8');

  const ast = Markdoc.parse(markdoc);
  const content = Markdoc.transform(ast, { tags });
  return content;
}
