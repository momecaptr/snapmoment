import { useCallback } from 'react';

import { CustomToast, CustomToastProps } from '@/shared/ui';
import { toast } from 'sonner';

export const useCustomToast = () => {
  const showToast = useCallback(({ message, type }: CustomToastProps) => {
    toast.custom(() => <CustomToast message={message} type={type} />);
  }, []);

  const showPromiseToast = useCallback(
    (promise: Promise<any>, messages: { error: string; loading: string; success: (data: any) => string }) => {
      toast.promise(promise, {
        error: <CustomToast message={messages.error} type={'error'} />,
        success: (data) => <CustomToast message={messages.success(data)} type={'success'} />
      });
    },
    []
  );

  return { showPromiseToast, showToast };
};
