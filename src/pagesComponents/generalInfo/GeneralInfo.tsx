import React from 'react';
import { useForm } from 'react-hook-form';

import ChangePhoto from '@/features/changePhotoProfile/ChangePhoto';
import GeneralInfoNavigation from '@/features/generalInfoNavigation/GeneralInfoNavigation';
import SaveGeneralInfo from '@/features/saveGeneralInfo/SaveGeneralInfo';
import { PersonalInfo } from '@/widget/generalInfoForms/PersonalInfo';

import s from './GeneralInfo.module.scss';
const GeneralInfo = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.wrapper}>
        <GeneralInfoNavigation />
        <div className={s.photoAndInfo}>
          <ChangePhoto />
          <PersonalInfo control={control} />
        </div>
        <span className={s.line} />
        <SaveGeneralInfo />
      </div>
    </form>
  );
};

export default GeneralInfo;
