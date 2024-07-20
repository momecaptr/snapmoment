'use client';

import { FullName, LangIconType } from '@/features';
import { Typography } from '@/shared/ui';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from '@/features/localeSwitcher/ui/LocaleSwitcher.module.scss';

type DropdownMenuItemProps = {
  fullName: FullName;
  icon: LangIconType;
  isoCode: string;
  onSelect: () => void;
};

export const LocaleMenuItem = (props: DropdownMenuItemProps) => {
  const { fullName, icon, onSelect } = props;

  return (
    <DropdownMenu.Item asChild>
      <div
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSelect();
          }
        }}
        className={s.boxContent}
        onClick={onSelect}
      >
        <div className={s.dropItemFlag}>{icon}</div>
        <Typography className={s.dropdownText} variant={'medium_text_14'}>
          {fullName}
        </Typography>
      </div>
    </DropdownMenu.Item>
  );
};
