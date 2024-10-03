import { toast } from 'sonner';

import s from './CustomToast.module.scss';

export type CustomToastProps = {
  message: string;
  type: 'error' | 'loading' | 'success';
};

export const CustomToast = ({ message, type }: CustomToastProps) => {
  return (
    <div className={`${s.toastContainer} ${s[type]}`}>
      <div className={s.toastMessage}>{message}</div>
      <button className={s.closeButton} onClick={() => toast.dismiss()}>
        ✖
      </button>
    </div>
  );
};
