import Link from 'next/link';
import { SITE_PAGES } from '@/config/constants';

export default function Custom500() {
  return (
    <main className='prose mx-auto grid h-full place-items-center py-16 px-8'>
      <div className=''>
        <h1>oops! a server error had occurred.</h1>
        <p className='mr-4'>let's get you back on the right path:</p>
        <ul>
          <li>
            <Link href='/'>home</Link>
          </li>
          {SITE_PAGES.map(({ title, url }) => (
            <li key={title}>
              <Link href={url}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
