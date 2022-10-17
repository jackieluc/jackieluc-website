import Link from 'next/link';

import { TableOfContent } from 'src/types/next';

export default function TableOfConents({ tableOfContents }: { tableOfContents: TableOfContent[] }) {
  return (
    <section className='my-8'>
      <h3>Table of Contents</h3>
      <ul className='[&>li]:m-0 [&>li]:list-none pl-2'>
        {tableOfContents.map((toc) => (
          <li key={toc.title}>
            <Link href={toc.url}>{toc.title}</Link>
            {toc.children && (
              <ul className='[&>li]:m-0 [&>li]:list-none m-0 pl-2'>
                {toc.children.map((child) => (
                  <li key={child.title}>
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
