import Link from 'next/link';

import { TableOfContent } from 'src/types/next';

export default function TableOfConents({ tableOfContents }: { tableOfContents: TableOfContent[] }) {
  return (
    <section className='my-8'>
      <h3>Table of Contents</h3>
      <ul className='pl-0'>
        {tableOfContents.map((toc) => (
          <li className='m-0 list-none pl-2' key={toc.title}>
            <Link href={toc.url}>{toc.title}</Link>
            {toc.children && (
              <ul className='m-0 pl-0'>
                {toc.children.map((child) => (
                  <li className='m-0 list-none pl-4' key={child.title}>
                    <Link href={child.url}>{child.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
