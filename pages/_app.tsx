import type { AppProps } from 'next/app';

import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/myApp/store';
import { DevMode } from '@/shared/ui';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import { NextPage } from 'next';
import { Toaster } from 'sonner';

import '@/myApp/styles/index.scss';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const { props, store } = wrapper.useWrappedStore(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <Component {...props} />
        <DevMode isActive />
        <Toaster position={'bottom-left'} />
      </Provider>
    </GoogleOAuthProvider>
  );
}
