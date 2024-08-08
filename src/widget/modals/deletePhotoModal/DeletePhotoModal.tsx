import React from 'react';

import { Button, Modal } from '@/shared/ui';

import s from './DeletePhotoModal.module.scss';
type Props = {
  deletePhotoProfile: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};
export const DeletePhotoModal = (props: Props) => {
  const { deletePhotoProfile, isOpen, setOpen } = props;

  const onChangeDeletePhoto = () => {
    deletePhotoProfile();
    setOpen(!isOpen);
  };

  const onChangeNoDeletePhoto = () => {
    setOpen(!isOpen);
  };

  return (
    <Modal className={s.sizeModal} onOpenChange={setOpen} open={isOpen} title={'Delete Photo'}>
      <div>Are you sure you want to delete the photo?</div>
      <div className={s.boxButton}>
        <Button onClick={onChangeDeletePhoto}>Yes</Button>
        <Button onClick={onChangeNoDeletePhoto}>No</Button>
      </div>
    </Modal>
  );
};
