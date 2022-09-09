import { expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '@/pages/index';

const blogPropertiesFixture = [
  {
    properties: {
      title: 'abc',
      excerpt: 'abc',
      category: 'abc',
      tags: [
        {
          id: 'abc',
          name: 'abc',
          color: 'name',
        },
      ],
      published: 'Fri Sep 09 2022 01:46:01 GMT-0700 ',
      seoimage: 'abc',
      seoimagealt: 'abc',
      seokeywords: 'abc',
    },
  },
];

test('home', () => {
  render(<Home recentBlogPostProperties={blogPropertiesFixture} />);
  const main = within(screen.getByRole('main'));
  expect(
    main.getByRole('heading', { level: 1, name: /software engineer, learn-it-all, punthusiest\./i })
  ).toBeDefined();
});
