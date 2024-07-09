'use client';
import { ReactNode, useContext } from 'react';

import { useAlertProvider } from '@/components/ui/alert/lib/hooks/useAlertProvider';
import { AlertContext } from '@/components/ui/alert/model/AlertContext';
import { Alert } from '@/components/ui/alert/ui/Alert';

type Props = {
  children: ReactNode;
};

export const AlertProvider = ({ children }: Props) => {
  const { alerts, errorAlert, removeAlert, successAlert } = useAlertProvider();

  return (
    <AlertContext.Provider value={{ errorAlert, removeAlert, successAlert }}>
      {children}
      <Alert alerts={alerts} removeAlert={removeAlert} />
    </AlertContext.Provider>
  );
};
export const useAlert = () => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  return context;
};
