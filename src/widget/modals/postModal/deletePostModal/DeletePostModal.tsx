// @flow
import * as React from 'react';

import { Button, Modal, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './DeletePostModal.module.scss';

type Props = {
  className?: string;
  deletePost: () => void;
  isOpen: boolean;
  setOpen: (val: boolean) => void;
};

/**
 *
 * @param deletePost - функция для удаления поста (там сначала картинки, потом сам пост удаляется)
 */
export const DeletePostModal = (props: Props) => {
  const { className, deletePost, isOpen, setOpen } = props;

  const yesHandler = () => {
    deletePost();
    setOpen(false);
  };
  const noHandler = () => {
    setOpen(false);
  };

  return (
    <Modal className={clsx(s.card)} onOpenChange={() => setOpen(false)} open={isOpen} title={'Delete Post'}>
      <div className={s.text}>
        <Typography variant={'regular_text_16'}>Are you sure you want to delete this post?</Typography>
      </div>
      <div className={s.buttonsWrapper}>
        <Button onClick={yesHandler} variant={'outlined'}>
          <Typography className={s.yes} variant={'h3'}>
            Yes
          </Typography>
        </Button>
        <Button onClick={noHandler}>
          <Typography variant={'h3'}>No</Typography>
        </Button>
      </div>
    </Modal>
  );
};
