import Link from 'next/link';
import useMediaQuery from '@/utils/layout/useMediaQuery';
import { BiRss } from 'react-icons/bi';
import { useRouter } from 'next/router';

import type { NextRouter } from 'next/router';

const SITE_LINKS = [
  ['about', '/about'],
  ['blog', '/blog'],
];

export default function Nav() {
  const isSmallScreen = useMediaQuery(768); // tablet
  const router = useRouter();

  return isSmallScreen ? <SmallScreenNav router={router} /> : <BigScreenNav router={router} />;
}

function SmallScreenNav({ router }: { router: NextRouter }) {
  return (
    <nav className='fixed bottom-0 w-full'>
      <ul className='menu menu-horizontal bg-primary flex justify-evenly divide-x-2'>
        <li className='w-full'>
          <Link
            href='/'
            className={`hover:bg-secondary w-full justify-center p-4 text-white hover:text-white ${
              getActiveRoute('/', router) ? `bg-secondary underline` : `no-underline`
            }`}
          >
            jackie luc
          </Link>
        </li>
        {SITE_LINKS.map(([title, url]) => (
          <li className='w-full' key={title}>
            <Link
              href={url}
              className={`hover:bg-secondary w-full justify-center p-4 text-white hover:text-white ${
                getActiveRoute(url, router) ? `bg-secondary underline` : `no-underline`
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function BigScreenNav({ router }: { router: NextRouter }) {
  return (
    <header className='navbar bg-beige sticky top-0 py-0 px-8'>
      <div className='navbar-start'>
        <Link
          href='/'
          className={`btn btn-ghost text-xl normal-case ${
            getActiveRoute('/', router)
              ? `bg-secondary hover:bg-secondary text-white underline hover:text-white`
              : `no-underline`
          }`}
        >
          jackie luc
        </Link>
      </div>
      <nav className='navbar-center flex'>
        <ul className='menu menu-horizontal gap-4 p-0'>
          {SITE_LINKS.map(([title, url]) => (
            <li className='w-full' tabIndex={0} key={title}>
              <Link
                href={url}
                className={`active:bg-secondary w-full justify-center rounded-md py-3 px-6 active:text-white ${
                  getActiveRoute(url, router) ? `bg-secondary text-white underline hover:text-white` : `no-underline`
                }`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='navbar-end'>
        <Link href='/rss.xml'>
          <BiRss size='2rem' />
        </Link>
      </div>
    </header>
  );
}

function getActiveRoute(to: string, router: NextRouter) {
  if (router.pathname !== '/' && to === '/') {
    return false;
  }

  return router.pathname.startsWith(to);
}
