import CloseOutline from '@/common/assets/components/CloseOutline';
import { AlertProps } from '@/components/ui/alert/types/types';
import { Typography } from '@/components/ui/typography/Typography';
import { clsx } from 'clsx';

import s from './Alert.module.scss';

import { Button } from '../../button/Button';
type Props = {
  alerts: AlertProps[];
  removeAlert: (id: string) => void;
};
export const Alert = ({ alerts, removeAlert }: Props) => {
  return (
    <div className={s.container}>
      {alerts.map((alert) => (
        <div className={clsx(s.alert, s[alert.type])} key={alert.id}>
          <Typography as={'span'} className={s.message} variant={'regular_text_16'}>
            {alert.message}
          </Typography>
          <Button className={s.btn} onClick={() => removeAlert(alert.id)}>
            <CloseOutline className={s.closeIcon} />
          </Button>
        </div>
      ))}
    </div>
  );
};
