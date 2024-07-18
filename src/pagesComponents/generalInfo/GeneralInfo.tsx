import React from 'react';
import { useForm } from 'react-hook-form';

import { ChangePhoto, GeneralInfoNavigation, SaveGeneralInfo } from '@/features';
import { GeneralInfoForms } from '@/widget';

import s from './GeneralInfo.module.scss';
export const GeneralInfo = () => {
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
          <GeneralInfoForms control={control} />
        </div>
        <span className={s.line} />
        <SaveGeneralInfo />
      </div>
    </form>
  );
};
