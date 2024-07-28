import { CreateNewPassword } from '@/pagesComponents';
import { getAuthLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <CreateNewPassword />
    </>
  );
}
Page.getLayout = getAuthLayout;
