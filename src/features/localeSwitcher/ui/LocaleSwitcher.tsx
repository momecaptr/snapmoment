import { useState } from 'react';

import TestIcon from '@/../public/assets/components/CheckboxIcon';
import { LocaleMenuItem } from '@/features';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from '@/features/localeSwitcher/ui/LocaleSwitcher.module.scss';

type LangIcon = any;
export type LangType = 'by' | 'en' | 'kz' | 'ru' | 'ua';
export type FullName = 'English' | 'Беларуская' | 'Русский' | 'Українська' | 'Қазақ';
type LangData = {
  fullName: FullName;
  icon: LangIcon;
  isoCode: LangType;
};
type TypedLangData = Record<LangType, LangData>;

export const LocaleSwitcher = () => {
  const [iconFlag, setIconFlag] = useState(<TestIcon />);
  const [currentLang, setCurrentLang] = useState<string>('test');
  const langData: TypedLangData = {
    by: { fullName: 'Беларуская', icon: <TestIcon />, isoCode: 'by' },
    en: { fullName: 'English', icon: <TestIcon />, isoCode: 'en' },
    kz: { fullName: 'Қазақ', icon: <TestIcon />, isoCode: 'kz' },
    ru: { fullName: 'Русский', icon: <TestIcon />, isoCode: 'ru' },
    ua: { fullName: 'Українська', icon: <TestIcon />, isoCode: 'ua' }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div aria-label={'Update dimensions'} className={s.IconButton} tabIndex={0}>
          <div className={s.flag}>{iconFlag}</div>
          {currentLang}
          <TestIcon className={s.iconArrowDown} />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={3}>
          {Object.entries(langData).map(([key, value]) => (
            <LocaleMenuItem
              fullName={value.fullName}
              icon={value.icon}
              isoCode={value.isoCode}
              key={key}
              onSelect={() => {}}
            />
          ))}
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
