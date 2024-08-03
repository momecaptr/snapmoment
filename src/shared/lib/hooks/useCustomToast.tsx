import { useCallback } from 'react';

import { CustomToastProps } from '@/shared/ui';
import { CustomToast } from '@/shared/ui/customToast/CustomToast';
import { toast } from 'sonner';

export const useCustomToast = () => {
  const showToast = useCallback(({ message, type }: CustomToastProps) => {
    toast.custom(() => <CustomToast message={message} type={type} />);
  }, []);

  return { showToast };
};
