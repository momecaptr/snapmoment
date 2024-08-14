import { CSSProperties, ComponentPropsWithoutRef } from 'react';

import CloseOutline from '@/../public/assets/components/CloseOutline';
import { Card, Typography } from '@/shared/ui';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';

import s from './Modal.module.scss';

export type ModalProps = {
  className?: string;
  onOpenChange: (value: boolean) => void;
  open: boolean;
  style?: CSSProperties;
  title?: string;
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>;

export const Modal = ({ children, className, style, title, ...props }: ModalProps) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Title></Dialog.Title>
      <Dialog.Description></Dialog.Description>
      <Dialog.Content className={clsx(s.DialogContent)}>
        <Dialog.Title />
        <Dialog.Description />
        <Card className={clsx(s.card, className)} style={style}>
          <div className={s.header} data-header={'header'}>
            <Typography as={'h1'} variant={'h1'}>
              {title}
            </Typography>
            <Dialog.Close asChild>
              <button aria-label={'Close'} className={s.closeBtn}>
                <CloseOutline />
              </button>
            </Dialog.Close>
          </div>
          <div className={s.content} data-content={'content'}>
            {children}
          </div>
        </Card>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
