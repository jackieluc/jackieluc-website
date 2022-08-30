import type { NextPage } from 'next';
import Image from 'next/image';
import Button from '@/components/button';

const Home: NextPage = () => {
  return (
    <div className='grid h-screen w-full place-items-center'>
      <main>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
        <Button />
        <h1>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <div>
          <a href='https://nextjs.org/docs'>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn'>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href='https://github.com/vercel/next.js/tree/canary/examples' className='text-secondary underline'>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'>
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
        <article className='prose'>
          <h1>Garlic bread with cheese: What the science tells us</h1>
          <p>
            For years <strong>parents</strong> have espoused the health benefits of eating garlic bread with cheese to
            their children, with the food earning such an iconic status in our culture that kids will often dress up as
            warm, cheesy loaf for Halloween. <a href='/'>read more...</a>
          </p>
          <p>
            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing
            up around the country.
          </p>
        </article>
      </main>

      <footer>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
