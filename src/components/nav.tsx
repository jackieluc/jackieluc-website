import Link from 'next/link';
import { useRouter } from 'next/router';
import useMediaQuery from '@/utils/layout/useMediaQuery';
import { BiRss } from 'react-icons/bi';

const SITE_LINKS = [
  ['about', '/about'],
  ['blog', '/blog'],
];

export default function Nav() {
  const isSmallScreen = useMediaQuery(1024); // laptop

  return <>{isSmallScreen ? <SmallScreenNav /> : <BigScreenNav />}</>;
}

function SmallScreenNav() {
  return (
    <nav className='fixed bottom-0 w-full'>
      <ul className='menu menu-horizontal bg-primary flex justify-evenly divide-x-2'>
        <li className='w-full'>
          <Link
            href='/'
            className={`hover:bg-secondary w-full justify-center p-4 text-white hover:text-white ${
              getActiveRoute('/') ? `bg-secondary underline` : `no-underline`
            }`}
          >
            Jackie Luc
          </Link>
        </li>
        {SITE_LINKS.map(([title, url]) => (
          <li className='w-full' key={title}>
            <Link
              href={url}
              className={`hover:bg-secondary w-full justify-center p-4 text-white hover:text-white ${
                getActiveRoute(url) ? `bg-secondary underline` : `no-underline`
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

function BigScreenNav() {
  return (
    <header className='navbar bg-beige sticky top-0 p-0'>
      <div className='navbar-start'>
        <Link
          href='/'
          className={`btn btn-ghost text-xl normal-case ${
            getActiveRoute('/')
              ? `bg-secondary hover:bg-secondary text-white underline hover:text-white`
              : `no-underline`
          }`}
        >
          Jackie Luc
        </Link>
      </div>
      <div className='navbar-center flex'>
        <ul className='menu menu-horizontal gap-4 p-0'>
          {SITE_LINKS.map(([title, url]) => (
            <li className='w-full' tabIndex={0} key={title}>
              <Link
                href={url}
                className={`active:bg-secondary w-full justify-center rounded-md py-3 px-6 active:text-white ${
                  getActiveRoute(url) ? `bg-secondary text-white underline hover:text-white` : `no-underline`
                }`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='navbar-end'>
        <Link href='/rss.xml'>
          <BiRss size='2rem' />
        </Link>
      </div>
    </header>
  );
}

function getActiveRoute(to: string) {
  const router = useRouter();

  if (router.pathname !== '/' && to === '/') {
    return false;
  }

  return router.pathname.startsWith(to);
}
