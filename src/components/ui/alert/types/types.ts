export type AlertTypeProps = 'error' | 'success';
export type AlertProps = {
  id: string;
  message: string;
  type: AlertTypeProps;
};
export type AlertState = {
  alerts: AlertProps[];
};
export type AlertFnProps = {
  autoClose?: number;
  message: string;
};

export type AlertContextType = {
  errorAlert: ({ autoClose, message }: AlertFnProps) => void;
  removeAlert: (id: string) => void;
  successAlert: ({ autoClose, message }: AlertFnProps) => void;
};
