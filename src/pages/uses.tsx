import Head from 'next/head';
import { NAME, USES } from '@/config/constants';
import Link from 'next/link';

export default function Uses() {
  return (
    <>
      <Head>
        <title>uses | {NAME}</title>
        <meta name='description' content='foo' />
      </Head>
      <main className='prose mx-auto px-4 py-16 md:grid'>
        <header>
          <h1>gadgets I love, software I use, and other things I recommend.</h1>
          <p>
            I'm a big believer that we should invest in good tools to make our daily work more enjoyable and also
            improve our quality of life.
          </p>
        </header>
        <div className='text-accent m-0 mx-auto max-w-fit rounded-full bg-gray-200 py-1 px-2.5 text-sm'>
          last updated: Sep 13, 2023
        </div>
        <div>
          {USES.map((section) => (
            <section
              className='md:border-l-primary mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-0 md:border-l-2 md:pl-4'
              key={section.title}
            >
              <h2 className='text-secondary m-0 text-2xl font-bold md:text-lg'>{section.title}</h2>
              <div className='col-span-3'>
                <ul className='[&>li]:m-0 [&>li]:p-0 m-0 list-none p-0'>
                  {section.uses.map((use: { title: string; description?: string; link?: string }) => (
                    <li key={use.title}>
                      <h3 className='m-0 text-base font-medium'>
                        {use?.link ? (
                          <Link href={use.link} title={use.title} target='_blank'>
                            {use.title}
                          </Link>
                        ) : (
                          use.title
                        )}
                      </h3>
                      {/** TODO: Convert to use RenderContent when migrating to Notion, will allow inline links */}
                      {use?.description && <p className='leading-normal'>{use.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
