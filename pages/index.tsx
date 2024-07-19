import React from 'react';

import { GeneralInfo } from '@/pagesComponents';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralInfo />;
}
