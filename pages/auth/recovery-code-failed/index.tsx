import React from 'react';

import { RecoveryCodeFailed } from '@/pagesComponents/recoveryCodeFailed/ui/RecoveryCodeFailed';
import { getAuthLayout } from '@/shared/providers';

export default function Page() {
  return getAuthLayout(
    <>
      <RecoveryCodeFailed />
    </>
  );
}
