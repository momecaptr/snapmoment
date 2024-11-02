// @flow
import * as React from 'react';

import { Button, Modal, Typography } from '@/shared/ui';

import s from './RenewalOffProceedModal.module.scss';

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setProceedStatus: (proceedStatus: boolean) => void;
};
export const RenewalOffProceedModal = (props: Props) => {
  const { openModal, setOpenModal, setProceedStatus } = props;

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleProceed = () => {
    setProceedStatus(true);
    handleClose();
  };

  return (
    <Modal
      className={s.sizeModal}
      onOpenChange={handleClose}
      open={openModal}
      title={'Warning: turning off auto-renewal'}
    >
      <Typography className={s.description}>
        {`Please note: if you turn off auto-renewal, your current subscription plan will be automatically canceled immediately, even if it hasn’t yet expired. Your subscription will revert to the PERSONAL plan.
         
        This means that if you turn off auto-renewal, you will lose access to your subscription and will need to pay again to reactivate it.
         
         Are you sure you want to proceed?`}
      </Typography>

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
