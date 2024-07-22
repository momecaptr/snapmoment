import type { AppProps } from 'next/app';

import React from 'react';

import { Alert } from '@/entities';
import GoogleAuthProvider from '@/myApp/GoogleAuthProvider';
import StoreProvider from '@/myApp/StoreProvider';
import { PageLayout } from '@/widget';

import '@/myApp/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <GoogleAuthProvider>
        <PageLayout>
          <Component {...pageProps} />
          <Alert />
        </PageLayout>
      </GoogleAuthProvider>
    </StoreProvider>
  );
}
