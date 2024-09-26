// @flow
import * as React from 'react';

import { closeAllModals } from '@/myApp/model/appSlice';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, Modal, Typography } from '@/shared/ui';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
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
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);

  const handleDiscard = () => setOpen(false);
  const handleSaveDraft = () => {
    // todo Добавить сохранение allPostImages в localStorage или в indexedDb
    localStorage.setItem('createPost', JSON.stringify(allPostImages));
    // Сбрасываем стейт названия модалки на Add Post (когда будем открывать модалку вновь, у нас все должно быть пусто)
    dispatch(createPostActions.setActiveSection({ section: 'Cropping' }));
    dispatch(closeAllModals());
  };

  return (
    <Modal
      className={clsx(s.card)}
      classNameContent={s.createPostModal}
      onOpenChange={handleDiscard}
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
