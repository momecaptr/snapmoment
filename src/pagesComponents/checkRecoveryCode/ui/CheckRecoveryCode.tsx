import { useCheckRecoveryCode } from '@/pagesComponents/checkRecoveryCode/lib/hooks/useCheckRecoveryCode';

export const CheckRecoveryCode = () => {
  const { isError } = useCheckRecoveryCode();

  if (isError) {
    return <div>Error verifying recovery code. Please try again.</div>;
  }

  return null;
};
