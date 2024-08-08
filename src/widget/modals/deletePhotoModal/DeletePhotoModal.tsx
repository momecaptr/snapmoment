import React, { memo, useCallback } from 'react';

import { Button, Modal } from '@/shared/ui';

import s from './DeletePhotoModal.module.scss';

type Props = {
  deletePhotoProfile: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const DeletePhotoModal = memo(({ deletePhotoProfile, isOpen, setOpen }: Props) => {
  const onChangeDeletePhoto = useCallback(() => {
    deletePhotoProfile();
    setOpen(false);
  }, [deletePhotoProfile, setOpen]);

  const onChangeNoDeletePhoto = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Modal className={s.sizeModal} onOpenChange={setOpen} open={isOpen} title={'Delete Photo'}>
      <div>Are you sure you want to delete the photo?</div>
      <div className={s.boxButton}>
        <Button onClick={onChangeDeletePhoto}>Yes</Button>
        <Button onClick={onChangeNoDeletePhoto}>No</Button>
      </div>
    </Modal>
  );
});
