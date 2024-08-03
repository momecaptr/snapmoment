import s from './CustomToast.module.scss';

import CloseOutline from '../../../../public/assets/components/CloseOutline';

export type CustomToastProps = {
  message: string;
  type: 'error' | 'success';
};

export const CustomToast = ({ message, type }: CustomToastProps) => {
  return (
    <div className={`${s.toastContainer} ${s[type]}`}>
      <div className={s.toastMessage}>{message}</div>
      <CloseOutline />
    </div>
  );
};
