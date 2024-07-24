import type { AppProps } from 'next/app';

import React from 'react';

import { Alert } from '@/entities';
import StoreProvider from '@/myApp/StoreProvider';
import { PageLayout } from '@/widget';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '@/myApp/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  const clientId = '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com';

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
