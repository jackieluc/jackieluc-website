import type { MetaFunction } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import favicon from '../public/favicon.png';
import styles from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'icon', href: favicon },
  { rel: 'stylesheet', href: styles },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap',
  },
];

// !TODO: add SEO images
export const meta: MetaFunction = () => {
  const name = 'Jackie Luc';
  const description = 'Trying to learn, grow, and build solutions that magnify the impact of others.';
  const url = 'https://www.jackieluc.com';

  return {
    language: 'English',
    charset: 'utf-8',
    title: name,
    viewport: 'width=device-width,initial-scale=1',
    description,
    keywords: 'jackie, jackie luc, blog, learning, software, career, professional, growth, inspiration',
    robots: 'index, follow',
    author: name,
    'og:title': name,
    'og:type': 'website',
    'og:image': '',
    'og:image:alt': '',
    'og:url': url,
    'og:description': description,
    'og:site_name': name,
    'twitter:card': 'summary_large_image',
    'twitter:domain': url,
    'twitter:url': url,
    'twitter:title': name,
    'twitter:description': description,
    'twitter:image': '',
    'twitter:image:alt': '',
    'twitter:site': '@jackiesthinking',
  };
};

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
