import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function Nav() {
  return (
    <nav className='fixed bottom-0 w-full lg:hidden'>
      <ul className='menu menu-horizontal bg-primary flex justify-evenly text-white'>
        <NavItem to='/'>Home</NavItem>
        <NavItem to='/blog'>Blog</NavItem>
      </ul>
    </nav>
  );
}

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  const router = useRouter();
  const active = router.pathname === to;

  return (
    <li className='w-full'>
      <Link href={to}>
        <a
          className={`hover:bg-secondary w-full justify-center text-white hover:text-white ${
            active ? 'bg-secondary' : ''
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}
