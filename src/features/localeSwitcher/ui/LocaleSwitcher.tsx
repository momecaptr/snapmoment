'use client';

import React, { useState } from 'react';

import ArrowIosDownOutline from '@/../public/assets/components/ArrowIosDownOutline';
import ByIcon from '@/../public/lang/ByIcon';
import GbIcon from '@/../public/lang/GbIcon';
import KzIcon from '@/../public/lang/KzIcon';
import RuIcon from '@/../public/lang/RuIcon';
import UaIcon from '@/../public/lang/UaIcon';
import { LocaleMenuItem } from '@/features';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './LocaleSwitcher.module.scss';

export type LangIconType = any;
export type LangType = 'by' | 'en' | 'kz' | 'ru' | 'ua';
export type FullName = 'English' | 'Беларуская' | 'Русский' | 'Українська' | 'Қазақ';
type LangData = {
  fullName: FullName;
  icon: LangIconType;
  isoCode: LangType;
};
type TypedLangData = Record<LangType, LangData>;

export const LocaleSwitcher = () => {
  const [iconFlag, setIconFlag] = useState(<GbIcon />);
  const [currentLang, setCurrentLang] = useState<string>('English');
  const langData: TypedLangData = {
    by: { fullName: 'Беларуская', icon: <ByIcon />, isoCode: 'by' },
    en: { fullName: 'English', icon: <GbIcon />, isoCode: 'en' },
    kz: { fullName: 'Қазақ', icon: <KzIcon />, isoCode: 'kz' },
    ru: { fullName: 'Русский', icon: <RuIcon />, isoCode: 'ru' },
    ua: { fullName: 'Українська', icon: <UaIcon />, isoCode: 'ua' }
  };

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
              onSelect={() => {}}
            />
          ))}
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
