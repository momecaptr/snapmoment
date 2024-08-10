import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { isPhotoInState } from '@/myApp/model/appSlice';
import { useGetUserProfilePhotoQuery } from '@/shared/api/mainPhotoProfile/mainPhotoProfileAPI';
import {
  useLazyGetPersonalInformationUserQuery,
  useSetPersonalInformationUserMutation
} from '@/shared/api/personalInformationUser/personalInformationUserAPI';
import { PersonalInformationArgs } from '@/shared/api/personalInformationUser/personalInformationUserTypes';
import { useAppDispatch } from '@/shared/lib';
import { profileSettingsSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { City, Country, ICity, IState, State } from 'country-state-city';

export const useGeneralInfoForms = () => {
  const [getInfo, { data, isLoading }] = useLazyGetPersonalInformationUserQuery();
  const [setPersonalInformation, { isLoading: isLoadingSet }] = useSetPersonalInformationUserMutation();
  const { data: getProfilePhoto } = useGetUserProfilePhotoQuery();

  const countryOptions = useMemo(
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
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<PersonalInformationArgs>({
    resolver: zodResolver(profileSettingsSchema)
  });

  const onSubmit: SubmitHandler<PersonalInformationArgs> = (formData) => {
    setPersonalInformation({
      aboutMe: formData.aboutMe,
      city: city,
      country: country,
      dateOfBirth: formData.dateOfBirth,
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

  return {
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
  };
};
