import type { Metadata } from 'next';

import React from 'react';

import StoreProvider from '@/app/StoreProvider';
import { Alert } from '@/shared/alert/ui/Alert';
import { SideBar } from '@/shared/sideBar/SideBar';
import Header from '@/widget/header/Header';
import { Inter } from 'next/font/google';

import '@/app/styles/index.scss';

import s from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'}>
      <body className={inter.className}>
        <StoreProvider>
          <div className={s.layout}>
            <div className={s.header}>
              <Header isAuthorized={false} />
            </div>
            <div className={s.sidebar}>
              <SideBar />
            </div>
            <div className={s.content}>{children}</div>
          </div>
          <Alert />
        </StoreProvider>
      </body>
    </html>
  );
}
