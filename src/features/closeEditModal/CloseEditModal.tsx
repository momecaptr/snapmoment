// @flow
import * as React from 'react';

import { Button, Modal, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './CloseEditModal.module.scss';

type Props = {
  className?: string;
  editModeHandler?: () => void;
  isOpen: boolean;
  setOpen: (val: boolean) => void;
};

/**
 *
 * @param editModalHandler - если передано, то для перевода наружнего состояния из edit true в false
 */
export const CloseEditModal = (props: Props) => {
  const { className, editModeHandler, isOpen, setOpen } = props;
  const yesHandler = () => {
    editModeHandler?.();
    setOpen(false);
  };
  const noHandler = () => {
    setOpen(false);
  };

  return (
    <Modal className={clsx(s.card)} onOpenChange={() => setOpen(false)} open={isOpen} title={'Close Post'}>
      <div className={s.text}>
        <Typography variant={'regular_text_16'}>Do you really want to close the edition of the publication?</Typography>
        <Typography variant={'regular_text_16'}>If you close changes won`t be saved</Typography>
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
