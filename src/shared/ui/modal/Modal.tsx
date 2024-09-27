import { CSSProperties, ComponentPropsWithoutRef, ReactNode } from 'react';

import CloseOutline from '@/../public/assets/components/CloseOutline';
import { Card, Typography } from '@/shared/ui';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';

import s from './Modal.module.scss';

export type ModalProps = {
  backButton?: ReactNode;
  className?: string;
  classNameContent?: string;
  nextButton?: ReactNode;
  onOpenChange: (value: boolean) => void;
  open: boolean;
  showCloseButton?: boolean;
  style?: CSSProperties;
  title?: string;
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>;

/**
 *
 * @param backButton - ReactNode. При передаче, слева от title отобразит компоненту (обычно для "Назад")
 * @param children - ReactNode
 * @param className - кастомная настройка стилей для Card компоненты (основа модалки)
 * @param classNameContent - кастомная настройка стилей для контента модалки
 * @param nextButton - ReactNode. При передаче, справа от title отобразит компоненту (обычно для "Вперед")
 * @param showCloseButton - дефолтно true - показывает кнопку Close
 * @param style - передача инлайновых стилей для Card компоненты (основа модалки)
 * @param title - заголовок
 * @param props
 * @constructor
 */
export const Modal = ({
  backButton,
  children,
  className,
  classNameContent,
  nextButton,
  showCloseButton = true,
  style,
  title,
  ...props
}: ModalProps) => (
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
            {backButton}
            <Typography as={'h1'} variant={'h1'}>
              {title}
            </Typography>
            {nextButton}
            <Dialog.Close asChild>
              <button aria-label={'Close'} className={clsx(s.closeBtn, { [s.hidden]: !showCloseButton })}>
                <CloseOutline />
              </button>
            </Dialog.Close>
          </div>
          <div className={clsx(s.content, classNameContent)} data-content={'content'}>
            {children}
          </div>
        </Card>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
