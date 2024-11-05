import s from './NotificationItem.module.scss';

type Props = {
  message: string;
};

export const NotificationItem = (props: Props) => {
  const { message } = props;

  return (
    <div className={s.notification}>
      <p>
        <strong>Новое уведомление!</strong> <span className={s.new}>New</span>
      </p>
      <p>{message}</p>
      <small>1 час назад</small>
    </div>
  );
};

/*
<div className={s.notificationEl}>
  <Typography className={s.notificationItem} variant={'h2'}>
    {text}
  </Typography>
</div>*/
