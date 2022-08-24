import Nav from '@/components/nav';
import { DOMAIN } from '@/config/constants';
import '@/styles/globals.css';
import PlausibleProvider from 'next-plausible';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain={DOMAIN} trackOutboundLinks>
      <Nav />
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
