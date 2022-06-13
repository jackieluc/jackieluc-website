import type { MetaFunction } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';

import favicon from '../public/favicon.png';
import SideNav from './components/side-nav';
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
      <body className='container mx-auto font-poppins lg:px-16'>
        <div className='flex'>
          <SideNav />
          <main className='flex-1'>
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='container mx-auto font-poppins lg:px-16'>
        <div className='flex'>
          <SideNav />
          <main className='flex-1'>
            <h1 className='text-3xl'>
              {caught.status} {caught.statusText}
            </h1>
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
