'use client';

import { MobileMenu } from '@/components/ui/mobileMenu/MobileMenu';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

export default function Home() {
  const res = 2;

  return (
    <main>
      <h1 style={{ color: 'green', fontFamily: 'Roboto' }}>DEVELOPMENT</h1>
      <MobileMenu />
    </main>
  );
}
