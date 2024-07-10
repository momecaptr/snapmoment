'use client';
import { memo } from 'react';

import { Button } from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal/Modal';
import { Typography } from '@/components/ui/typography/Typography';

import s from './SentEmailModal.module.scss';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const SentEmailModal = memo(({ open, setOpen }: Props) => {
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
