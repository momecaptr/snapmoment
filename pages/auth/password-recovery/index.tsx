import { PasswordRecovery } from '@/pagesComponents';
import { getNonAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <PasswordRecovery />
    </>
  );
}
Page.getLayout = getNonAuthorizedLayout;
