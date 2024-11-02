// @flow
import * as React from 'react';

import { Button, Modal } from '@/shared/ui';
import { PaymentModalContentType } from '@/widget/generalInformation/accountManagement/lib/accountManagementConstantsTypes';

import s from './PaymentModals.module.scss';

type Props = {
  content: PaymentModalContentType | undefined;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};
export const PaymentModals = (props: Props) => {
  const { content, openModal, setOpenModal } = props;

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal className={s.sizeModal} onOpenChange={handleClose} open={openModal} title={content?.title}>
      <div>{content?.description}</div>
      <div className={s.boxButton}>
        <Button className={s.btn} onClick={handleClose} fullWidth>
          {content?.buttonText}
        </Button>
      </div>
    </Modal>
  );
};
