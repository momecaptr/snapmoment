import { ComponentProps, ElementType, ReactNode, memo } from 'react';

import clsx from 'clsx';

import s from './Typography.module.scss';

type TypographyVariant =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'regular_text_16'
  | 'bold_text_16'
  | 'regular_text_14'
  | 'medium_text_14'
  | 'bold_text_14'
  | 'small_text'
  | 'semi_bold_small_text'
  | 'regular_link'
  | 'small_link';

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
  variant = 'regular_text_16',
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
