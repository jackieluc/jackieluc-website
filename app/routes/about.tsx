import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { buildMarkdocContent, renderMarkdoc } from '~/utils/markdoc';

export const loader: LoaderFunction = async () => {
  let blogContent = buildMarkdocContent('test.mdoc');

  return json(blogContent);
};

export default function About() {
  const blogContent = useLoaderData();

  let markdoc = renderMarkdoc(blogContent);

  return (
    <div>
      <h1>About</h1>
      {markdoc}
    </div>
  );
}
