// @flow
import * as React from 'react';

import { Button, Modal, Typography } from '@/shared/ui';

import s from './RenewalOffProceedModal.module.scss';

type Props = {
  onProceedStatusChange: (status: boolean) => void;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};
export const RenewalOffProceedModal = (props: Props) => {
  const { onProceedStatusChange, openModal, setOpenModal } = props;

  const handleClose = () => {
    setOpenModal(false);
    onProceedStatusChange(false);
  };

  const handleProceed = () => {
    setOpenModal(false);
    onProceedStatusChange(true);
  };

  return (
    <Modal
      className={s.sizeModal}
      onOpenChange={handleClose}
      open={openModal}
      title={'Warning: turning off auto-renewal'}
    >
      <div>
        <div className={s.marginBottom}>
          <Typography as={'span'} variant={'bold_text_16'}>
            Please note:{' '}
          </Typography>
          <Typography as={'span'}>
            If you turn off auto-renewal, you won’t be able to re-enable it until you reactivate your subscription.
          </Typography>
        </div>
        <Typography className={s.marginBottom}>
          This means that if you disable auto-renewal and later wish to turn it back on, you won’t be able to do so
          until your current subscription period ends.
        </Typography>
        <Typography>Are you sure you want to proceed?</Typography>
      </div>

      <div className={s.boxButton}>
        <Button className={s.btn} onClick={handleClose} variant={'outlined'}>
          Cancel
        </Button>
        <Button className={s.btn} onClick={handleProceed}>
          Yes, proceed
        </Button>
      </div>
    </Modal>
  );
};
