import type { AppProps } from 'next/app';

import React from 'react';
import { Provider } from 'react-redux';

import store from '@/app/store';
import { Alert } from '@/entities';
import { BaseLayout } from '@/widget/baseLayout/BaseLayout';

import '../src/app/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Component {...pageProps} />
        <Alert />
      </BaseLayout>
    </Provider>
  );
}
