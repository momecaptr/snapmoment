import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, ReactNode, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './Card.module.scss';

export type CardProps<T extends ElementType = 'div'> = {
  as?: T;
  children?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const CardPolymorph = <T extends ElementType = 'div'>(props: CardProps<T>, ref: any) => {
  const { as: Component = 'div', className, ...rest } = props;

  return <Component className={clsx(s.root, className)} {...rest} ref={ref} />;
};

export const Card = forwardRef(CardPolymorph) as <T extends ElementType = 'div'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>;
  } & CardProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>
) => ReturnType<typeof CardPolymorph>;
