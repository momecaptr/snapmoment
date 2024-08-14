import { useCallback } from 'react';

import { CustomToast, CustomToastProps } from '@/shared/ui';
import { toast } from 'sonner';

export const useCustomToast = () => {
  const showToast = useCallback(({ message, type }: CustomToastProps) => {
    toast.custom(() => <CustomToast message={message} type={type} />);
  }, []);

  return { showToast };
};
