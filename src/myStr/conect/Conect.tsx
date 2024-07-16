import React from 'react';

import ChangePhoto from '@/myStr/changePhooto/ChangePhoto';
import LineWithButton from '@/myStr/lineWithButton/LineWithButton';
import PersonalInfo from '@/myStr/personalInfo/PersonalInfo';
import SettingNavigation from '@/myStr/settingNavigation/SettingNavigation';

import s from './Conect.module.scss';
const Conect = () => {
  return (
    <div className={s.wrapper}>
      <SettingNavigation />
      <div className={s.photoAndInfo}>
        <ChangePhoto />
        <PersonalInfo />
      </div>
      <LineWithButton />
    </div>
  );
};

export default Conect;
