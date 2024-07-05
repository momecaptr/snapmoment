import { ComponentProps, ElementType, ReactNode, memo } from 'react';

import clsx from 'clsx';

import s from './Typography.module.scss';

type TypographyVariant =
  | 'body1'
  | 'body2'
  | 'caption'
  | 'error'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'large'
  | 'link1'
  | 'link2'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2';

type TextOwnProps<E extends ElementType = ElementType> = {
  as?: E;
  children?: ReactNode | string;
  className?: string;
  variant?: TypographyVariant;
};

type TextProps<E extends ElementType> = Omit<ComponentProps<E>, keyof TextOwnProps> & TextOwnProps<E>;

const defaultElement = 'div';

const Typography = <E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  variant = 'body1',
  ...otherProps
}: TextProps<E>) => {
  const classNames = clsx(s[variant], className);
  const Component = as || 'p';

  return (
    <Component className={classNames} {...otherProps}>
      {children}
    </Component>
  );
};

export default memo(Typography);
