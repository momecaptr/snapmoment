import { CSSProperties, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';

import s from './CustomDropDown.module.scss';

import { Typography, TypographyVariant } from '../typography/Typography';

type DropdownProps = {
  align?: 'center' | 'end' | 'start';
  children?: ReactNode;
  className?: string;
  isArrow?: boolean;
  side?: 'bottom' | 'left' | 'right' | 'top';
  sideOffset?: number;
  stayOpen?: boolean;
  style?: CSSProperties;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>;

export const CustomDropdown = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, DropdownProps>(
  (
    {
      align,
      children,
      className,
      isArrow = true,
      side = 'bottom',
      sideOffset = 8,
      stayOpen = false,
      style,
      trigger
    }: DropdownProps,
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const classNames = {
      arrow: clsx(s.arrow),
      arrowWrap: clsx(s.arrowWrap),
      content: clsx(s.dropdownMenuContent, className),
      itemsWrap: clsx(s.itemsWrap)
    };

    return (
      <DropdownMenu.Root onOpenChange={setOpen} open={open}>
        <DropdownMenu.Trigger className={s.trigger} ref={ref} asChild>
          {trigger}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            onClick={(event) => {
              event.stopPropagation();
              stayOpen ? setOpen(true) : setOpen(false);
            }}
            align={align}
            className={clsx(s.dropdownMenuContent, className)}
            side={side}
            sideOffset={sideOffset}
            style={style}
          >
            {isArrow && <DropdownMenu.Arrow className={classNames.arrowWrap} />}
            <div className={classNames.itemsWrap}>{children}</div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);

type DropdownItemProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>;
export const CustomDropdownItem = ({
  children,
  className,
  disabled,
  onSelect,
  style,
  ...restProps
}: DropdownItemProps) => {
  const classNames = {
    item: clsx(s.dropdownMenuItem, className)
  };

  return (
    <DropdownMenu.Item className={classNames.item} disabled={disabled} onSelect={onSelect} style={style} {...restProps}>
      {children}
    </DropdownMenu.Item>
  );
};

type DropdownItemWithIconProps = {
  icon?: ReactNode;
  title: string;
  variant?: TypographyVariant;
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item> &
  Omit<DropdownItemProps, 'children'>;

export const CustomDropdownItemWithIcon = ({
  className,
  disabled,
  icon,
  onSelect,
  style,
  title,
  variant,
  ...rest
}: DropdownItemWithIconProps) => {
  const classNames = {
    icon: clsx(s.itemIcon),
    item: clsx(s.dropdownMenuItem, className)
  };

  return (
    <DropdownMenu.Item
      className={classNames.item}
      disabled={disabled}
      onClick={(event) => event.stopPropagation()}
      onSelect={onSelect}
      style={style}
      {...rest}
    >
      <div className={classNames.icon}>{icon}</div>
      <Typography variant={variant ?? 'large'}>{title}</Typography>
    </DropdownMenu.Item>
  );
};
