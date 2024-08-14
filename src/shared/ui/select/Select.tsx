import { ArrowIosDownOutline } from '@/../public/assets/components';
import { SelectOptionsType, Typography } from '@/shared/ui';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';

import s from './Select.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  name?: string;
  onValueChange?: (items: string) => void;
  selectOptions: SelectOptionsType[];
  value?: string;
};

export const SelectUI = ({ className, disabled, name, onValueChange, selectOptions, value }: Props) => {
  const selectClasses = {
    button: clsx(s.button, s.className),
    content: clsx(s.selectContent),
    icon: clsx(s.selectIcon, className && s.className),
    root: clsx(s.selectRoot),
    selectItem: clsx(s.selectItem, s.className),
    trigger: clsx(s.selectTrigger, disabled && s.selectTriggerDisabled, className),
    viewport: clsx(s.selectViewport)
  };

  const selectedOption = selectOptions.find((el) => el.value === value);

  return (
    <div className={selectClasses.root}>
      <Select.Root disabled={disabled} name={name} onValueChange={onValueChange}>
        <Select.Trigger aria-label={'select'} className={selectClasses.trigger} asChild>
          <button>
            <Typography className={s.selectVariant} variant={'regular_text_14'}>
              {selectedOption ? selectedOption.text : 'Select an option'}
            </Typography>
            <ArrowIosDownOutline className={selectClasses.icon} />
          </button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={selectClasses.content} position={'popper'}>
            <Select.Viewport className={selectClasses.viewport}>
              {selectOptions.map((option) => (
                <Select.Item className={selectClasses.selectItem} key={option.value} value={option.value}>
                  <Select.ItemText className={s.selectText}>
                    <Typography variant={'regular_text_14'}>{option.text}</Typography>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
