import { useCallback, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ByIcon from '@/../public/lang/ByIcon';
import GbIcon from '@/../public/lang/GbIcon';
import KzIcon from '@/../public/lang/KzIcon';
import RuIcon from '@/../public/lang/RuIcon';
import UaIcon from '@/../public/lang/UaIcon';

type LangIcon = any;
export type LangType = 'by' | 'en' | 'kz' | 'ru' | 'ua';
export type FullName = 'English' | 'Беларуская' | 'Русский' | 'Українська' | 'Қазақ';

type LangData = {
  fullName: FullName;
  icon: LangIcon;
  isoCode: LangType;
};

type TypedLangData = Record<LangType, LangData>;

export const useLangData = () => {
  const { i18n } = useTranslation();
  const langData: TypedLangData = {
    by: { fullName: 'Беларуская', icon: <ByIcon />, isoCode: 'by' },
    en: { fullName: 'English', icon: <GbIcon />, isoCode: 'en' },
    kz: { fullName: 'Қазақ', icon: <KzIcon />, isoCode: 'kz' },
    ru: { fullName: 'Русский', icon: <RuIcon />, isoCode: 'ru' },
    ua: { fullName: 'Українська', icon: <UaIcon />, isoCode: 'ua' }
  };
  const [iconFlag, setIconFlag] = useState(langData.en.icon);
  const [currentLang, setCurrentLang] = useState<string>(langData[i18n.language as LangType]?.fullName || 'English');

  useLayoutEffect(() => {
    /*const storedLocale = localStorage.getItem('locale') || i18n.language;*/

    setIconFlag(<GbIcon />);
  }, []);

  const changeLanguage = useCallback(
    (lang: string, icon?: any) => {
      //icon будет использоваться для переключения отображаемой иконки
      i18n.changeLanguage(lang);
      localStorage.setItem('locale', lang);
      setCurrentLang(lang);
    },
    [i18n]
  );

  return { changeLanguage, currentLang, iconFlag, langData, setCurrentLang, setIconFlag };
};
