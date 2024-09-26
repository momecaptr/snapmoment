// @flow
import * as React from 'react';

import { closeAllModals } from '@/myApp/model/appSlice';
import { useAppDispatch } from '@/shared/lib';
import { Button, Modal, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './CloseCreatePostModal.module.scss';

type Props = {
  className?: string;
  isOpen: boolean;
  setOpen: (val: boolean) => void;
};
export const CloseCreatePostModal = (props: Props) => {
  const { className, isOpen, setOpen } = props;
  const dispatch = useAppDispatch();

  const handleDiscard = () => setOpen(false);
  const handleSaveDraft = () => dispatch(closeAllModals());

  return (
    <Modal
      className={clsx(s.card)}
      classNameContent={s.createPostModal}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      title={'Close'}
    >
      <div className={s.boxContent}>
        <Typography variant={'regular_text_16'}>
          Do you really want to close the creation of a publication? If you close everything will be deleted
        </Typography>
        <div className={s.buttonsWrapper}>
          <Button onClick={handleDiscard}>
            <Typography variant={'h3'}>Discard</Typography>
          </Button>
          <Button onClick={handleSaveDraft}>
            <Typography variant={'h3'}>Save draft</Typography>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
