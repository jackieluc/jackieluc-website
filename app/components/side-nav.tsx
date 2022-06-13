import { Link } from '@remix-run/react';

export default function SideNav() {
  return (
    <nav className='lg:h-screen lg:px-24 lg:py-32 lg:text-lg'>
      <ul>
        <li className='pb-4 text-4xl'>
          <Link to='/'>Jackie Luc</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/blog'>Blog</Link>
        </li>
        <li>
          <Link to='/now'>Now</Link>
        </li>
        <li>
          <Link to='/uses'>Uses</Link>
        </li>
        <li>
          <Link to='/things-i-like'>Things I Like</Link>
        </li>
      </ul>
    </nav>
  );
}
