import { ComponentProps, ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
} & ComponentProps<typeof Button>;

import { Button } from '@/shared/ui';

import s from '../Pagination.module.scss';

export const PageLink = ({ active, children, className, disabled, ...props }: Props) => {
  const customClassName = clsx(
    s.pageLink,
    {
      [s.active]: active,
      [s.disabled]: disabled
    },
    className
  );

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
