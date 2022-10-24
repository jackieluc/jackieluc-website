import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

import { TableOfContent } from 'src/types/next';

export default function TableOfConents({
  tableOfContents,
  isSmallScreen,
}: {
  tableOfContents: TableOfContent[];
  isSmallScreen?: boolean;
}) {
  return !!isSmallScreen ? (
    <SmallScreenTableOfContents tableOfContents={tableOfContents} />
  ) : (
    <BigScreenTableOfContents tableOfContents={tableOfContents} />
  );
}

function SmallScreenTableOfContents({ tableOfContents }: { tableOfContents: TableOfContent[] }) {
  const [open, setOpen] = useState(false);
  const tocRef = useRef(null);

  useEffect(() => {
    tocRef.current && autoAnimate(tocRef.current);
  }, [tocRef]);

  return (
    <div className='border-secondary rounded-xl border-2'>
      <button
        className={`text-secondary flex w-full items-center justify-between ${
          open ? 'border-secondary border-b-2 ease-in-out' : ''
        } py-2 px-4`}
        onClick={() => setOpen(!open)}
      >
        <h2 className='m-0 text-base font-bold'>On this page</h2>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <nav className='' ref={tocRef}>
        {open && (
          <ul className='m-0 px-4 py-2 text-sm'>
            {tableOfContents.map((toc) => (
              <li className='mx-0 my-2 list-none pl-2' key={toc.title}>
                <Link href={toc.url} className='no-underline'>
                  {toc.title}
                </Link>
                {toc.children && (
                  <ul className='m-0 pl-0'>
                    {toc.children.map((child) => (
                      <li className='mx-0 my-2 list-none pl-4' key={child.title}>
                        <Link href={child.url} className='no-underline'>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}

function BigScreenTableOfContents({ tableOfContents }: { tableOfContents: TableOfContent[] }) {
  return (
    <div className='border-secondary rounded-xl border-2'>
      <h2 className='text-secondary border-secondary m-0 border-b-2 px-4 py-2 text-base font-bold'>On this page</h2>
      <nav>
        <ul className='m-0 px-4 py-2 text-sm'>
          {tableOfContents.map((toc) => (
            <li className='mx-0 my-2 list-none pl-2' key={toc.title}>
              <Link href={toc.url} className='no-underline'>
                {toc.title}
              </Link>
              {toc.children && (
                <ul className='m-0 pl-0'>
                  {toc.children.map((child) => (
                    <li className='mx-0 my-2 list-none pl-4' key={child.title}>
                      <Link href={child.url} className='no-underline'>
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
