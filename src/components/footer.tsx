import Link from 'next/link';
import { SITE_PAGES } from '@/config/constants';

export default function Footer() {
  return (
    <footer className='mt-32 mb-16 w-full sm:px-8'>
      <div className='mx-auto max-w-7xl lg:px-8'>
        <div className='border-secondary border-t pt-10 pb-16'>
          <div className='relative px-4 sm:px-8 lg:px-12'>
            <div className='mx-auto max-w-2xl lg:max-w-5xl'>
              <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                <div className='flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200'>
                  <Link className='hover:text-primary no-underline transition' href='/'>
                    home
                  </Link>
                  {SITE_PAGES.map(({ title, url }) => (
                    <Link className='hover:text-primary no-underline transition' href={url} key={title}>
                      {title}
                    </Link>
                  ))}
                  <Link className='hover:text-primary no-underline transition' href='/rss.xml'>
                    rss
                  </Link>
                </div>
                <p className='text-secondary text-sm'>© {new Date().getFullYear()} Jackie Luc. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
