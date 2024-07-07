'use client';
import { Button } from '@/components/ui/button/Button';
import { Typography } from '@/components/ui/typography/Typography';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

export default function Home() {
  const res = 2;

  return (
    <main>
      <h1 style={{ color: 'green', fontFamily: 'Roboto' }}>DEVELOPMENT</h1>
      <Typography as={'span'} variant={'large'}>
        Hello, World!
      </Typography>
      <Button>Здарова</Button>
    </main>
  );
}
