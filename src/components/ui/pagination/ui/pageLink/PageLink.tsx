import { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button/Button';
import clsx from 'clsx';

import s from '../Pagination.module.scss';

type Props = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
} & ComponentProps<typeof Button>;

export const PageLink = ({ active, children, className, disabled, ...props }: Props) => {
  const customClassName = clsx(s.pageLink, className, {
    [s.active]: active,
    [s.disabled]: disabled,
  });

  return (
    <div className={s.pageLinkWrapper}>
      {disabled ? (
        <Button className={clsx(customClassName, s.pageLink)}>{children}</Button>
      ) : (
        <Button {...props} aria-current={active ? 'page' : undefined} className={customClassName}>
          {children}
        </Button>
      )}
    </div>
  );
};
