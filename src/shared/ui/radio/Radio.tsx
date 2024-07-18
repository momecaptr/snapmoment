import { ComponentPropsWithoutRef, forwardRef } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { clsx } from 'clsx';

import s from './Radio.module.scss';

export type RadioRootProps = ComponentPropsWithoutRef<typeof RadioGroup.Root>;
export const Root = forwardRef<HTMLDivElement, RadioRootProps>(({ className, ...rest }: RadioRootProps, ref) => {
  const classNames = {
    root: clsx(s.root, className)
  };

  return <RadioGroup.Root className={classNames.root} ref={ref} {...rest} />;
});

export type RadioItemProps = ComponentPropsWithoutRef<typeof RadioGroup.Item>;
export const Item = forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ children, className, disabled, value, ...rest }: RadioItemProps, ref) => {
    const classNames = {
      indicator: clsx(s.indicator, className),
      item: clsx(s.item, disabled && s.disabled, className),
      label: clsx(s.label, disabled && s.disabled, className)
    };

    return (
      <label className={classNames.label}>
        <RadioGroup.Item className={classNames.item} disabled={disabled} ref={ref} value={value} {...rest}>
          <RadioGroup.Indicator className={classNames.indicator} {...rest} ref={ref} />
        </RadioGroup.Item>
        {children}
      </label>
    );
  }
);

export const Radio = {
  Item,
  Root
};
