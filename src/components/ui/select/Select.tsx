import { ArrowIosDownOutline } from '@/common/assets/components';
import { selectOptionsType } from '@/components/ui/pagination/PaginationWithSelect';
import { Typography } from '@/components/ui/typography/Typography';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';

import s from '@/components/ui/select/Select.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  onValueChange?: (items: string) => void;
  selectOptions: selectOptionsType[];
  value?: string;
};
export const SelectUI = ({ className, disabled, onValueChange, selectOptions, value }: Props) => {
  const selectClasses = {
    button: clsx(className && s.button, s.className),
    content: clsx(s.selectContent),
    icon: clsx(s.selectIcon, className && s.className),
    root: s.selectRoot,
    selectItem: clsx(s.selectItem, className && s.className),
    trigger: clsx(s.selectTrigger, { [s.className]: className }, disabled && s.selectTriggerDisabled),
    viewport: clsx(s.selectViewport),
  };

  return (
    <div className={selectClasses.root}>
      <Select.Root disabled={disabled} onValueChange={onValueChange}>
        <Select.Trigger aria-label={'select'} className={selectClasses.trigger} asChild>
          <button>
            <Typography className={s.selectVariant} variant={'regular_text_14'}>
              {selectOptions.find((el) => el.value === value)?.text || selectOptions[0].text}
            </Typography>
            <ArrowIosDownOutline className={selectClasses.icon} />
          </button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={selectClasses.content} position={'popper'}>
            <Select.Viewport className={selectClasses.viewport}>
              {selectOptions.map((option) => {
                return (
                  <Select.Item className={selectClasses.selectItem} key={option.value} value={option.value}>
                    <Select.ItemText className={s.selectText}>
                      <Typography variant={'regular_text_14'}>{option.text}</Typography>
                    </Select.ItemText>
                  </Select.Item>
                );
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
