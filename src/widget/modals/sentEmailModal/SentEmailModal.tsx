import { memo } from 'react';

import { Button, Modal, Typography } from '@/shared/ui';
import { useRouter } from 'next/router';

import s from './SentEmailModal.module.scss';

type Props = {
  email: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const SentEmailModal = memo(({ email, open, setOpen }: Props) => {
  const router = useRouter();

  const handleOnClose = () => {
    setOpen(false);
    router.replace('/auth/sign-in');
  };

  return (
    <>
      <Modal className={s.modal} onOpenChange={handleOnClose} open={open} title={'Email sent'}>
        <div className={s.container}>
          <div className={s.message}>
            <Typography className={s.text} variant={'regular_text_16'}>
              We have sent a link to confirm your email to
            </Typography>{' '}
            <Typography as={'span'} className={s.text} variant={'regular_text_16'}>
              {email}
            </Typography>
          </div>
          <Button className={s.btn} onClick={handleOnClose}>
            <Typography variant={'h3'}>OK</Typography>
          </Button>
        </div>
      </Modal>
    </>
  );
});
