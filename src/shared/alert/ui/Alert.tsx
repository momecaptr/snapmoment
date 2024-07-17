'use client';

import CloseOutline from '@/../public/assets/components/CloseOutline';
import { alertSelectors } from '@/shared/alert/model/alertSlice';
import { useActions } from '@/shared/hooks/useActions';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './Alert.module.scss';

export const Alert = () => {
  const alerts = useAppSelector(alertSelectors.selectAlerts);
  const { removeAlert } = useActions();

  const handleRemoveAlert = (id: string) => {
    removeAlert({ id });
  };

  return (
    <div className={s.container}>
      {alerts.map((alert) => (
        <div className={clsx(s.alert, s[alert.type])} key={alert.id}>
          <Typography as={'span'} className={s.message} variant={'regular_text_16'}>
            {alert.message}
          </Typography>
          <Button className={s.btn} onClick={() => handleRemoveAlert(alert.id)}>
            <CloseOutline className={s.closeIcon} />
          </Button>
        </div>
      ))}
    </div>
  );
};
