import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useId } from 'react';

import CheckIcon from '@/../public/assets/components/CheckboxIcon';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import clsx from 'clsx';

import s from './Checkbox.module.scss';

export type CheckboxPropsProps = {
  error?: string | undefined;
  label?: ReactNode;
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>;

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxPropsProps>(
  (props: CheckboxPropsProps, ref) => {
    const { checked, className, disabled, error, id, label, onCheckedChange, ...rest } = props;
    const generatedId = useId();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        onCheckedChange && onCheckedChange(!checked);
      }
    };

    const classNames = {
      indicator: clsx(s.CheckboxIndicator, {
        [s.checked]: checked,
        [s.disabled]: disabled
      }),
      label: clsx(s.Label, { [s.disabled]: disabled }, className),
      root: clsx(
        s.CheckboxRoot,
        {
          [s.checked]: checked,
          [s.disabled]: disabled
        },
        className
      )
    };

    return (
      <div className={s.CheckboxContainer}>
        <CheckboxRadix.Root
          {...rest}
          checked={checked}
          className={classNames.root}
          id={id ?? generatedId}
          onCheckedChange={onCheckedChange}
          onKeyDown={handleKeyDown}
          ref={ref}
        >
          {checked && (
            <CheckboxRadix.Indicator className={classNames.indicator} asChild>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          )}
        </CheckboxRadix.Root>
        <label className={classNames.label} htmlFor={id ?? generatedId}>
          {label}
        </label>
      </div>
    );
  }
);
