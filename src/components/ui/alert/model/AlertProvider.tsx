import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useAlertProvider } from '@/components/ui/alert/lib/hooks/useAlertProvider';
import { Alert } from '@/components/ui/alert/ui/Alert';

import { AlertContext } from './AlertContext';

type Props = {
  children: ReactNode;
};

export const AlertProvider = ({ children }: Props) => {
  const { alerts, errorAlert, removeAlert, successAlert } = useAlertProvider();

  return (
    <AlertContext.Provider value={{ errorAlert, removeAlert, successAlert }}>
      {children}
      {createPortal(<Alert alerts={alerts} removeAlert={removeAlert} />, document.body)}
    </AlertContext.Provider>
  );
};
