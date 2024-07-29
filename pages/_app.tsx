import type { AppProps } from 'next/app';

import React from 'react';

import { Alert } from '@/entities';
import GoogleAuthProvider from '@/myApp/GoogleAuthProvider';
import StoreProvider from '@/myApp/StoreProvider';
import { PageLayout } from '@/widget';
import { Toaster } from 'sonner';

import '@/myApp/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <GoogleAuthProvider>
        <PageLayout>
          <Component {...pageProps} />
          <Alert />
          <Toaster richColors />
        </PageLayout>
      </GoogleAuthProvider>
    </StoreProvider>
  );
}
