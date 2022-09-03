import Head from 'next/head';
import Nav from '@/components/nav';
import { DOMAIN, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_IMAGE, SITE_URL } from '@/config/constants';
import '@/styles/globals.css';
import PlausibleProvider from 'next-plausible';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain={DOMAIN} trackOutboundLinks>
      <Head>
        <link rel='icon' href='/favicon.png' />
        <title>Jackie Luc</title>
        <meta name='description' content={SITE_DESCRIPTION} />
        <meta name='keywords' content={SITE_KEYWORDS} />
        <meta name='image' content={SITE_IMAGE} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={SITE_URL} />
        <meta property='og:title' content='Jackie Luc' />
        <meta property='og:description' content={SITE_DESCRIPTION} />
        <meta property='og:image' content={SITE_IMAGE} />
        <meta name='twitter:site' content='@jackiesthinking' />
        <meta name='twitter:creator' content='@jackiesthinking' />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
