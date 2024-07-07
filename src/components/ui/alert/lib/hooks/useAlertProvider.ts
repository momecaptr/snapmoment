'use client';

import { useState } from 'react';
import { AlertFnProps, AlertProps } from '@/components/ui/alert/types/types';

export const useAlertProvider = () => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const successAlert = ({ autoClose = 3000, message }: AlertFnProps) => {
    const id = new Date().getTime().toString();

    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type: 'success' }]);

    setTimeout(() => {
      removeAlert(id);
    }, autoClose);
  };

  const errorAlert = ({ autoClose = 3000, message }: AlertFnProps) => {
    const id = new Date().getTime().toString();

    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type: 'error' }]);

    setTimeout(() => {
      removeAlert(id);
    }, autoClose);
  };

  const removeAlert = (id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return { alerts, errorAlert, removeAlert, successAlert };
};
