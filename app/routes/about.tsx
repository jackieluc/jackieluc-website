import React from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import renderMarkdoc from '~/utils/markdoc';

import Markdoc from '@markdoc/markdoc';
import Callout from '~/components/markdoc/tags/callout';

export const loader: LoaderFunction = async () => {
  let content = renderMarkdoc('test.mdoc');

  return json(content);
};

export default function About() {
  const content = useLoaderData();

  let doc = Markdoc.renderers.react(content, React, {
    components: {
      Callout: Callout,
    },
  });

  return (
    <div>
      <h1>About</h1>
      {doc}
    </div>
  );
}
