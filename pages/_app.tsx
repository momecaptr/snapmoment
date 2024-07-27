import type { AppProps } from 'next/app';

import React from 'react';

import { Alert } from '@/entities';
import StoreProvider from '@/myApp/StoreProvider';
import { PageLayout } from '@/widget';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

import '@/myApp/styles/index.scss';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
export default function App({ Component, pageProps }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <StoreProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <PageLayout>
          <Component {...pageProps} />
          <Alert />
        </PageLayout>
      </GoogleOAuthProvider>
    </StoreProvider>
  );
}
