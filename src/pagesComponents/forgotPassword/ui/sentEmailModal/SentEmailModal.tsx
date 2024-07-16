'use client';
import { memo } from 'react';

import { Modal, Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/button/Button';

import s from './SentEmailModal.module.scss';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SentEmailModal = memo(({ open, setOpen }: Props) => {
  const handleOnClose = () => {
    // router.navigate(path.login)
    setOpen(false);
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
              epam@epam.com
              {/*{email} вместо epam@epam.com*/}
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

export default SentEmailModal;
