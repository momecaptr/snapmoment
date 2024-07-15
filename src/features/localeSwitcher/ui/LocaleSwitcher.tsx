'use client';

import ArrowIosDownOutline from '@/../public/assets/components/ArrowIosDownOutline';
import { useLangData } from '@/features/localeSwitcher/lib/hooks/useLangData';
import LocaleMenuItem from '@/features/localeSwitcher/ui/localeMenuItem/LocaleMenuItem';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from '@/features/localeSwitcher/ui/LocaleSwitcher.module.scss';

const LocaleSwitcherDrop = () => {
  const { changeLanguage, currentLang, iconFlag, langData } = useLangData();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div aria-label={'Update dimensions'} className={s.IconButton} tabIndex={0}>
          <div className={s.flag}>{iconFlag}</div>
          {currentLang}
          <ArrowIosDownOutline className={s.iconArrowDown} />
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
              onSelect={() => changeLanguage(key, value.icon)}
            />
          ))}
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LocaleSwitcherDrop;
