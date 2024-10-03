// @flow
import * as React from 'react';

import { useAppSelector } from '@/shared/lib';
import { Button, Modal, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './CloseCreatePostModal.module.scss';

import { useRefreshPostCreationData } from '../../hooks/useRefreshPostCreationData';
import { createPostSelectors } from '../../service/createPostSlice';

type Props = {
  className?: string;
  isOpen: boolean;
  setOpen: (val: boolean) => void;
};

/**
 * Компонента модалки закрытия создания поста.
 * @constructors * Кнопка yes удаляет все из стейта,
 * * а кнопка save draft ТОЖЕ ЧИСТИТ СТЕЙТ, НО сохраняет все в ЛОКАЛСТОРАДЖ
 */
export const CloseCreatePostModal = (props: Props) => {
  const { className, isOpen, setOpen } = props;
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const { refreshPostCreationData } = useRefreshPostCreationData();

  const handleDiscard = () => {
    refreshPostCreationData();
  };
  const handleSaveDraft = () => {
    allPostImages.length && localStorage.setItem('createPost', JSON.stringify(allPostImages));
    refreshPostCreationData();
  };

  return (
    <Modal className={clsx(s.card)} onOpenChange={() => setOpen(false)} open={isOpen} title={'Close'}>
      <div className={s.text}>
        <Typography variant={'regular_text_16'}>Do you really want to close the creation of a publication?</Typography>
        <Typography variant={'regular_text_16'}>If you close everything will be deleted</Typography>
      </div>
      <div className={s.buttonsWrapper}>
        <Button onClick={handleDiscard} variant={'outlined'}>
          <Typography className={s.yes} variant={'h3'}>
            Yes
          </Typography>
        </Button>
        <Button onClick={handleSaveDraft}>
          <Typography variant={'h3'}>Save draft</Typography>
        </Button>
      </div>
    </Modal>
  );
};
