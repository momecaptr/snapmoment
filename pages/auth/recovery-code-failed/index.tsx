import React from 'react';

import { RecoveryCodeFailed } from '@/pagesComponents/recoveryCodeFailed/ui/RecoveryCodeFailed';
import { getNonAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  return getNonAuthorizedLayout(
    <>
      <RecoveryCodeFailed />
    </>
  );
}
