import { PasswordRecovery } from '@/pagesComponents';
import { getAuthLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <PasswordRecovery />
    </>
  );
}
Page.getLayout = getAuthLayout;
