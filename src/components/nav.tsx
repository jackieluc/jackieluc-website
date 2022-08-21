import Link from 'next/link';
import { useRouter } from 'next/router';
import useMediaQuery from '@/utils/layout/useMediaQuery';

const SITE_URLS = [
  ['Home', '/'],
  ['Blog', '/blog'],
];

export default function Nav() {
  const isSmallScreen = useMediaQuery(1024); // laptop

  return <>{isSmallScreen ? <SmallScreenNav /> : <BigScreenNav />}</>;
}

function SmallScreenNav() {
  return (
    <nav className='fixed bottom-0 w-full'>
      <ul className='menu menu-horizontal bg-primary flex justify-evenly divide-x-2'>
        {SITE_URLS.map(([title, url]) => (
          <li className='w-full'>
            <Link href={url}>
              <a
                className={`hover:bg-secondary w-full justify-center p-4 text-white hover:text-white ${
                  getActiveRoute(url) ? `bg-secondary underline` : `no-underline`
                }`}
              >
                {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function BigScreenNav() {
  return (
    <nav className='navbar text-secondary bg-beige fixed top-0 max-w-5xl justify-center text-lg'>
      <ul className='flex list-none gap-4'>
        {SITE_URLS.map(([title, url]) => (
          <li className='w-full'>
            <Link href={url}>
              <a
                className={`w-full justify-center rounded-md py-3 px-6  ${
                  getActiveRoute(url) ? `bg-secondary text-white underline hover:text-white` : `no-underline`
                }`}
              >
                {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function getActiveRoute(to: string) {
  const router = useRouter();
  return router.pathname === to;
}
