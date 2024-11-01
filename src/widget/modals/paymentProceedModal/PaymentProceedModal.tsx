// @flow
import * as React from 'react';

import { Button, Modal, Typography } from '@/shared/ui';

import s from './PaymentProceedModal.module.scss';

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setProceedStatus: (proceedStatus: boolean) => void;
};
export const PaymentProceedModal = (props: Props) => {
  const { openModal, setOpenModal, setProceedStatus } = props;

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleProceed = () => {
    setProceedStatus(true);
    handleClose();
  };

  return (
    <Modal className={s.sizeModal} onOpenChange={handleClose} open={openModal} title={'Before you pay'}>
      <Typography>
        Please note: after you complete the payment for the selected subscription plan, switching to the PERSONAL plan
        will cancel your current subscription. This means that if you change plans, you will no longer have access to
        your subscription, and you will need to pay again to reactivate it.
      </Typography>

      <div className={s.boxButton}>
        <Button className={s.btn} onClick={handleClose} variant={'outlined'}>
          Cancel
        </Button>
        <Button className={s.btn} onClick={handleProceed}>
          Ok, proceed
        </Button>
      </div>
    </Modal>
  );
};
