import { CSSProperties, ComponentPropsWithoutRef, ReactNode, forwardRef, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';

import s from './CustomDropDownWrapper.module.scss';

import { Typography, TypographyVariant } from '../typography/Typography';

type CustomDropdownWrapperProps = {
  align?: 'center' | 'end' | 'start';
  children?: ReactNode;
  className?: string;
  classNameArrow?: string;
  classNameTriggerActive?: string;
  isArrow?: boolean;
  onCloseCallback?: () => void;
  onOpenCallback?: () => void;
  side?: 'bottom' | 'left' | 'right' | 'top';
  sideOffset?: number;
  stayOpen?: boolean;
  style?: CSSProperties;
  trigger: ReactNode;
  triggerActive?: ReactNode;
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>;

/**
 * Компонент `CustomDropdownWrapper` — настраиваемый выпадающий список, который может содержать
 * различные элементы, такие как кнопки или другие интерактивные элементы.
 *
 * * align - Выравнивание выпадающего меню по горизонтали.
 * * children - Дочерние элементы, которые будут отображаться в выпадающем меню.
 * * className - Дополнительные классы для стилизации контейнера выпадающего меню.
 * * classNameTriggerActive - Классы для стилизации триггера, когда меню открыто.
 * * classNameArrow - Классы для стилизации стрелки, когда меню открыто. Фон задавать через fill, обводку - stroke
 * * isArrow - Определяет, будет ли стрелка отображаться на выпадающем меню (по умолчанию `true`).
 * * side - Сторона, с которой открывается выпадающее меню.
 * * sideOffset - Отступ между триггером и выпадающим меню (по умолчанию `8`).
 * * stayOpen - Если `true`, меню остается открытым после клика по элементам (по умолчанию `false`).
 * * style - Дополнительные стили для выпадающего меню.
 * * trigger - Элемент триггера, по которому открывается выпадающее меню.
 * * triggerActive - Элемент триггера, отображаемый, когда меню открыто. ДЛЯ ТЕХ СЛУЧАЕВ, КОГДА ИКОНКА ДОЛЖНА ОТЛИЧАТЬСЯ ОТ ТРИГГЕРА В ЗАКРЫТОМ СОСТОЯНИИ.
 * * onOpenCallback - Дополнительное действие при открытии dropDown
 * * onCloseCallback - Дополнительное действие при закрытии dropDown
 */
export const CustomDropdownWrapper = forwardRef<HTMLButtonElement, CustomDropdownWrapperProps>(
  (
    {
      align = 'center',
      children,
      className,
      classNameArrow,
      classNameTriggerActive,
      isArrow = false,
      onCloseCallback,
      onOpenCallback,
      side = 'bottom',
      sideOffset = 8,
      stayOpen = false,
      style,
      trigger,
      triggerActive
    }: CustomDropdownWrapperProps,
    ref
  ) => {
    const [open, setOpen] = useState(false);
    // const triggerCondition = !triggerActive ? trigger : open ? triggerActive : trigger;
    const triggerCondition = () => {
      if (!triggerActive) {
        return trigger;
      } else {
        return open ? triggerActive : trigger;
      }
    };

    const handleOpenChange = () => {
      if (open) {
        onCloseCallback?.();
      }
      if (!open) {
        onOpenCallback?.();
      }
      setOpen((prev) => !prev);
    };

    const classNames = {
      arrow: clsx(s.arrow),
      arrowWrap: clsx(s.arrowWrap, classNameArrow),
      content: clsx(s.dropdownMenuContent, className),
      itemsWrap: clsx(s.itemsWrap)
    };

    return (
      <DropdownMenu.Root onOpenChange={handleOpenChange} open={open}>
        <DropdownMenu.Trigger className={clsx(s.trigger, open && classNameTriggerActive)} ref={ref} asChild>
          {triggerCondition()}
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
            {isArrow && <DropdownMenu.Arrow className={classNames.arrowWrap} height={10} width={20} />}
            <div className={classNames.itemsWrap}>
              {children} {/* Рендерим children напрямую */}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);

type CustomDropdownItemProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

/**
 * Компонент `CustomDropdownItem` — элемент выпадающего меню, представляющий отдельный пункт.
 *
 * @param {ReactNode} children - Дочерние элементы, которые будут отображаться в пункте меню.
 * @param {string} className - Дополнительные классы для стилизации элемента меню.
 * @param {boolean} disabled - Определяет, доступен ли элемент для взаимодействия (по умолчанию `false`).
 * @param {CSSProperties} style - Дополнительные стили для элемента меню.
 */
export const CustomDropdownItem = ({
  children,
  className,
  disabled,
  onSelect,
  style,
  ...restProps
}: CustomDropdownItemProps) => {
  const classNames = {
    item: clsx(s.dropdownMenuItem, className)
  };

  return (
    <DropdownMenu.Item className={classNames.item} disabled={disabled} onSelect={onSelect} style={style} {...restProps}>
      {children}
    </DropdownMenu.Item>
  );
};

type CustomDropdownItemWithIconProps = {
  icon?: ReactNode;
  title: string;
  variant?: TypographyVariant;
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item> &
  Omit<CustomDropdownItemProps, 'children'>;
/**
 * Компонент `CustomDropdownItemWithIcon` — элемент выпадающего меню с иконкой и заголовком.
 *
 * @param {string} className - Дополнительные классы для стилизации элемента меню.
 * @param {boolean} disabled - Определяет, доступен ли элемент для взаимодействия (по умолчанию `false`).
 * @param {ReactNode} icon - Иконка, отображаемая рядом с заголовком пункта меню.
 * @param {function} onSelect - Обработчик события выбора пункта меню.
 * @param {CSSProperties} style - Дополнительные стили для элемента меню.
 * @param {string} title - Заголовок, отображаемый в пункте меню.
 * @param {TypographyVariant} variant - Вариант стилизации текста заголовка.
 */
export const CustomDropdownItemWithIcon = ({
  className,
  disabled,
  icon,
  onSelect,
  style,
  title,
  variant,
  ...rest
}: CustomDropdownItemWithIconProps) => {
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
