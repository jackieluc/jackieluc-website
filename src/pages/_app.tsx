import '@/styles/globals.css';
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import {
  NAME,
  DOMAIN,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_IMAGE,
  SITE_URL,
  SITE_IMAGE_ALT,
} from '@/config/constants';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain={DOMAIN} trackOutboundLinks>
      <Head>
        <link rel='icon' href='/favicon.png' key='favicon' />
        <title key='title'>{NAME}</title>
        <meta name='description' content={SITE_DESCRIPTION} key='description' />
        <meta name='keywords' content={SITE_KEYWORDS} key='keywords' />
        <meta name='image' content={SITE_IMAGE} key='image' />
        <meta property='og:type' content='website' key='og:type' />
        <meta property='og:url' content={SITE_URL} key='og:url' />
        <meta property='og:title' content={NAME} key='og:title' />
        <meta property='og:description' content={SITE_DESCRIPTION} key='og:description' />
        <meta property='og:image' content={SITE_IMAGE} key='og:image' />
        <meta property='og:image:alt' content={SITE_IMAGE_ALT} key='og:image:alt' />
        <meta name='twitter:card' content='summary_large_image' key='twitter:card' />
        <meta name='twitter:site' content='@jackiesthinking' key='twitter:site' />
        <meta name='twitter:creator' content='@jackiesthinking' key='twitter:creator' />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </PlausibleProvider>
  );
}
