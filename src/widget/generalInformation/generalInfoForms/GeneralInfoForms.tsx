import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ChangePhoto, SaveGeneralInfo } from '@/features';
import { isPhotoInState } from '@/myApp/model/appSlice';
import { useGetUserProfilePhotoQuery } from '@/shared/api/mainPhotoProfile/mainPhotoProfileAPI';
import {
  useLazyGetPersonalInformationUserQuery,
  useSetPersonalInformationUserMutation
} from '@/shared/api/personalInformationUser/personalInformationUserAPI';
import { PersonalInformationArgs } from '@/shared/api/personalInformationUser/personalInformationUserTypes';
import { useAppDispatch } from '@/shared/lib';
import { profileSettingsSchema } from '@/shared/schemas';
import { DatePicker, FormTextfield, Loading, SelectUI, Typography } from '@/shared/ui';
import { FormTextfieldArea } from '@/shared/ui/forms/FormTextFieldArea';
import { zodResolver } from '@hookform/resolvers/zod';
import { City, Country, ICity, IState, State } from 'country-state-city';
import Link from 'next/link';

import s from './GeneralInfoForms.module.scss';

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

  const [getInfo, { data, isLoading }] = useLazyGetPersonalInformationUserQuery();
  const [setPersonalInformation, { isLoading: isLoadingSet }] = useSetPersonalInformationUserMutation();
  const { data: getProfilePhoto } = useGetUserProfilePhotoQuery();

  const countryOptions: CountryOption[] = useMemo(
    () =>
      Country.getAllCountries()
        .filter((country) =>
          State.getStatesOfCountry(country.isoCode).some(
            (state) => City.getCitiesOfState(country.isoCode, state.isoCode).length > 0
          )
        )
        .map((country) => ({
          text: country.name,
          value: country.isoCode
        })),
    []
  );

  const [stateData, setStateData] = useState<IState[]>([]);
  const [cityData, setCityData] = useState<ICity[]>([]);
  const [country, setCountry] = useState<string>(countryOptions[0]?.value || '');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date('2000-01-01'));
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(profileSettingsSchema)
  });

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    setPersonalInformation({
      aboutMe: formData.aboutMe,
      city: city,
      country: country,
      dateOfBirth: date.toISOString(), // Преобразуем дату в ISO строку для хранения
      firstName: formData.firstName,
      lastName: formData.lastName,
      region: state,
      userName: formData.userName
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getInfo();

      if (data) {
        reset({
          aboutMe: data.aboutMe ?? '',
          city: data.city ?? '',
          country: data.country ?? '',
          dateOfBirth: data.dateOfBirth ?? '',
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          region: data.region ?? '',
          userName: data.userName ?? ''
        });

        setCountry(data.country ?? '');
        setState(data.region ?? '');
        setCity(data.city ?? '');
        setDate(data.dateOfBirth ? new Date(data.dateOfBirth) : new Date('2000-01-01'));
      }
    };

    fetchData();
  }, [getInfo, reset]);

  useEffect(() => {
    if (country) {
      const states = State.getStatesOfCountry(country).filter((state) => {
        return City.getCitiesOfState(country, state.isoCode).length > 0;
      });

      setStateData(states);
      if (!states.some((s) => s.isoCode === state)) {
        setState(states.length > 0 ? states[0].isoCode : '');
      }
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      const cities = City.getCitiesOfState(country, state);

      setCityData(cities);
      if (!cities.some((c) => c.name === city)) {
        setCity(cities.length > 0 ? cities[0].name : '');
      }
    }
  }, [country, state]);

  useEffect(() => {
    if (getProfilePhoto && getProfilePhoto?.avatars?.length > 0) {
      dispatch(isPhotoInState(true));
    } else {
      dispatch(isPhotoInState(false));
    }
  }, [getProfilePhoto, dispatch]);

  const onChangeCountry = useCallback((value: string) => {
    setCountry(value);
    setState('');
    setCity('');
  }, []);

  const onChangeState = useCallback((value: string) => {
    setState(value);
    setCity('');
  }, []);

  const onChangeCity = useCallback((value: string) => {
    setCity(value);
  }, []);

  const stateOptions = useMemo(
    () =>
      stateData.map((state) => ({
        text: state.name,
        value: state.isoCode
      })),
    [stateData]
  );

  const cityOptions = useMemo(
    () =>
      cityData.map((city) => ({
        text: city.name,
        value: city.name
      })),
    [cityData]
  );

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
                <DatePicker error={!!errors.dateOfBirth} name={'dateOfBirth'} onChange={setDate} value={date} />
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

                {stateData.length > 0 && (
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
