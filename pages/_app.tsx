import type { AppProps } from 'next/app';

import React from 'react';
import { Provider } from 'react-redux';

import store from '@/app/store';
import { Alert } from '@/entities';
import { PageLayout } from '@/widget';

import '../src/app/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageLayout>
        <Component {...pageProps} />
        <Alert />
      </PageLayout>
    </Provider>
  );
}
