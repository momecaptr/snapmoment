import React, { memo } from 'react';
import { Controller } from 'react-hook-form';

import { ChangePhoto, SaveGeneralInfo } from '@/features';
import { PersonalInformationArgs } from '@/shared/api/personalInformationUser/personalInformationUserTypes';
import { DatePicker, FormTextfield, Loading, SelectUI, Typography } from '@/shared/ui';
import { FormTextfieldArea } from '@/shared/ui/forms/FormTextFieldArea';
import Link from 'next/link';

import s from './GeneralInfoForms.module.scss';

import { useGeneralInfoForms } from '../lib/useGeneralInfoForms';

type PersonalInfoProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

type CountryOption = {
  text: string;
  value: string;
};

type FormData = PersonalInformationArgs;

export const GeneralInfoForms = memo((props: PersonalInfoProps) => {
  const { isOpen, setOpen } = props;

  const {
    city,
    cityData,
    cityOptions,
    control,
    country,
    countryOptions,
    data,
    errors,
    handleSubmit,
    isLoading,
    onChangeCity,
    onChangeCountry,
    onChangeState,
    onSubmit,
    state,
    stateData,
    stateOptions
  } = useGeneralInfoForms();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {data ? (
          <div className={s.wrapper}>
            <ChangePhoto isOpen={isOpen} setOpen={setOpen} deletePhoto />
            <div className={s.boxAllFormContent}>
              <div className={s.formTextFieldBox}>
                <FormTextfield
                  className={s.input}
                  control={control}
                  currentValue={data.userName}
                  label={'Username*'}
                  name={'userName'}
                  type={'text'}
                />
                <FormTextfield
                  className={s.input}
                  control={control}
                  currentValue={data.firstName}
                  label={'First Name*'}
                  name={'firstName'}
                  type={'text'}
                />
                <FormTextfield
                  className={s.input}
                  control={control}
                  currentValue={data.lastName}
                  label={'Last Name*'}
                  name={'lastName'}
                  type={'text'}
                />
              </div>
              <div className={s.datePickerBox}>
                <Typography className={s.label} variant={'regular_text_14'}>
                  Date of birth
                </Typography>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      error={!!errors.dateOfBirth}
                      name={'dateOfBirth'}
                      onChange={(newValue) => onChange(newValue)}
                      value={value}
                    />
                  )}
                  control={control}
                  name={'dateOfBirth'}
                />
                {errors.dateOfBirth && (
                  <Typography className={s.errorDate} variant={'small_text'}>
                    A user under 13 cannot create a profile.{' '}
                    <Link className={s.PrivacyLink} href={'/auth/privacy'}>
                      Privacy Policy
                    </Link>
                  </Typography>
                )}
              </div>
              <div className={s.selectBoxForThreeSelect}>
                <div>
                  <Typography className={s.label} variant={'regular_text_14'}>
                    Select your country
                  </Typography>
                  <SelectUI
                    className={s.select}
                    name={'country'}
                    onValueChange={onChangeCountry}
                    selectOptions={countryOptions}
                    value={country}
                  />
                </div>

                {stateData.length && (
                  <div>
                    <Typography className={s.label} variant={'regular_text_14'}>
                      Select your region
                    </Typography>
                    <SelectUI
                      className={s.select}
                      onValueChange={onChangeState}
                      selectOptions={stateOptions}
                      value={state}
                    />
                  </div>
                )}
                {cityData.length > 0 && (
                  <div>
                    <Typography className={s.label} variant={'regular_text_14'}>
                      Select your city
                    </Typography>
                    <SelectUI
                      className={s.select}
                      name={'city'}
                      onValueChange={onChangeCity}
                      selectOptions={cityOptions}
                      value={city}
                    />
                  </div>
                )}
              </div>
              <FormTextfieldArea
                control={control}
                currentValue={data?.aboutMe}
                label={'About Me'}
                name={'aboutMe'}
                rows={5}
                resize
              />
            </div>
            <div className={s.footer}>
              <span className={s.line} />
              <SaveGeneralInfo />
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </form>
    </>
  );
});
