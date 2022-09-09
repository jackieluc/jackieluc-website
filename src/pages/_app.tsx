import '@/styles/globals.css';
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { DOMAIN, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_IMAGE, SITE_URL, SITE_IMAGE_ALT } from '@/config/constants';

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
        <meta property='og:image:alt' content={SITE_IMAGE_ALT} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@jackiesthinking' />
        <meta name='twitter:creator' content='@jackiesthinking' />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </PlausibleProvider>
  );
}
