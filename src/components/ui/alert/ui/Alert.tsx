'use client';

import CloseOutline from '@/common/assets/components/CloseOutline';
import { useActions } from '@/common/hooks/useActions';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { alertSelectors } from '@/components/ui/alert/model/alertSlice';
import { Button } from '@/components/ui/button/Button';
import { Typography } from '@/components/ui/typography/Typography';
import { clsx } from 'clsx';

import s from './Alert.module.scss';

const Alert = () => {
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

export default Alert;
