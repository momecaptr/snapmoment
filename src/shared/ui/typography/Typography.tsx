import { ComponentProps, ElementType, ReactNode, memo } from 'react';

import s from './Typography.module.scss';

export type TypographyVariant =
  | 'bold_text_14'
  | 'bold_text_16'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'large'
  | 'medium_text_14'
  | 'regular_link'
  | 'regular_text_14'
  | 'regular_text_16'
  | 'semi_bold_small_text'
  | 'small_link'
  | 'small_text';

type TextOwnProps<E extends ElementType = ElementType> = {
  as?: E;
  children?: ReactNode | string;
  className?: string;
  variant?: TypographyVariant;
};

type TextProps<E extends ElementType> = Omit<ComponentProps<E>, keyof TextOwnProps> & TextOwnProps<E>;

const defaultElement = 'div';

const TypographyBasic = <E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  variant = 'regular_text_16',
  ...otherProps
}: TextProps<E>) => {
  const classNames = `${className} ${s[variant]}`;
  const Component = as || 'p';

  return (
    <Component className={classNames} {...otherProps}>
      {children}
    </Component>
  );
};

export const Typography = memo(TypographyBasic);
