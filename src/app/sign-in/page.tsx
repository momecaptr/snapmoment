'use client';
import React from 'react';

import { Button } from '@/components/ui/button/Button';
import { SideBar } from '@/components/ui/sideBar/SideBar';
import { Typography } from '@/components/ui/typography/Typography';

export default function SignIn() {
  return (
    <div>
      <SideBar />
      <Typography variant={'large'}>
        <Button>Sign In</Button>
      </Typography>
    </div>
  );
}
