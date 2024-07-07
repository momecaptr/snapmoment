import { CSSProperties, ComponentPropsWithoutRef } from 'react';

import { Card } from '@/components/ui/card/Card';
import { Typography } from '@/components/ui/typography/Typography';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';

import s from './Modal.module.scss';

export type Props = {
  className?: string;
  onOpenChange: (value: boolean) => void;
  open: boolean;
  style?: CSSProperties;
  title?: string;
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>;

export const Modal = ({ children, className, style, title, ...props }: Props) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Content className={clsx(s.DialogContent)}>
        <Card className={clsx(className, s.card)} style={style}>
          <div className={s.header}>
            <Typography as={'h1'} variant={'h1'}>
              {title}
            </Typography>
            <Dialog.Close asChild>
              <button aria-label={'Close'} className={s.closeBtn}>
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </div>
          <div className={s.content}>{children}</div>
        </Card>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
