import type { AppProps } from 'next/app';

import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from '@/app/store';
import { Alert } from '@/entities';
import { PageLayout } from '@/widget';
import { NextPage } from 'next';

import '../src/app/styles/index.scss';

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Provider store={store}>
      <PageLayout>
        <Component {...pageProps} />
        <Alert />
      </PageLayout>
    </Provider>
  );
}
