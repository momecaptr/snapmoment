import type { AppProps } from 'next/app';

import React from 'react';

import { Alert } from '@/entities';
import StoreProvider from '@/myApp/StoreProvider';
import { PageLayout } from '@/widget';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SessionProvider } from 'next-auth/react';

import '@/myApp/styles/index.scss';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <StoreProvider>
      <SessionProvider session={session}>
        <GoogleOAuthProvider clientId={clientId}>
          <PageLayout>
            <Component {...pageProps} />
            <Alert />
          </PageLayout>
        </GoogleOAuthProvider>
      </SessionProvider>
    </StoreProvider>
  );
}
