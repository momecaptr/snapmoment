import React from 'react';

import ChangePhoto from '@/features/changePhotoProfile/ChangePhoto';
import GeneralInfoNavigation from '@/features/generalInfoNavigation/GeneralInfoNavigation';
import SaveGeneralInfo from '@/features/saveGeneralInfo/SaveGeneralInfo';
import PersonalInfo from '@/widget/generalInfoForms/PersonalInfo';

import s from './GeneralInfo.module.scss';
const GeneralInfo = () => {
  return (
    <div className={s.wrapper}>
      <GeneralInfoNavigation />
      <div className={s.photoAndInfo}>
        <ChangePhoto />
        <PersonalInfo />
      </div>
      <span className={s.line} />
      <SaveGeneralInfo />
    </div>
  );
};

export default GeneralInfo;
