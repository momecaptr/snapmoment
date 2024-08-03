import React, { useEffect, useId, useMemo, useState } from 'react';
import { Control } from 'react-hook-form';

import { DatePicker, FormTextfield, RangeDate, SelectUI, addNumberDay } from '@/shared/ui';
import { FormTextfieldArea } from '@/shared/ui/forms/FormTextFieldArea';
import { City, Country } from 'country-state-city';

import s from './GeneralInfoForms.module.scss';
type PersonalInfoProps = {
  control: Control;
};

type CityType = {
  countryCode: string;
  latitude?: null | string;
  longitude?: null | string;
  name: string;
  stateCode: string;
};
export const GeneralInfoForms = (props: PersonalInfoProps) => {
  const { control } = props;
  const [date, setDate] = useState<RangeDate>({
    endDate: addNumberDay({ date: new Date(), day: 2 }),
    startDate: new Date()
  });

  const id = useId();

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const libCountries = Country.getAllCountries();
  const libCities = City.getCitiesOfCountry(country);
  const transformedCountries = useMemo(
    () =>
      libCountries.map((country) => ({
        text: country.name,
        value: country.isoCode
      })),
    []
  );

  const transformedCities = useMemo(
    () =>
      libCities?.map((city) => ({
        text: city.name,
        value: `${city.name}-${city.countryCode}-${city.latitude} - ${city.longitude}`
      })) || [],
    [country]
  );

  const [allCountries, setAllCountries] = useState<{ text: string; value: string }[]>(transformedCountries);
  const [allCities, setAllCities] = useState<{ text: string; value: string }[]>(transformedCities);

  // useEffect(() => {
  //   setAllCountries(transformedCountries);
  // }, []);

  useEffect(() => {
    setAllCities(transformedCities);
  }, [transformedCities]);

  const changeCountry = (value: string) => {
    setCountry(value);
  };

  const changeCity = (value: string) => {
    setCity(value);
  };

  console.log({ allCities, allCountries });

  return (
    <div className={s.wrapper}>
      <FormTextfield className={s.input} control={control} label={'Username*'} name={'Username'} type={'text'} />
      <FormTextfield className={s.input} control={control} label={'First Name'} name={'FirstName'} type={'text'} />
      <FormTextfield className={s.input} control={control} label={'Last Name'} name={'LastName'} type={'text'} />
      <div className={s.datePickerBox}>
        <DatePicker onChange={setDate} value={date} />
      </div>
      <div className={s.selectBox}>
        <SelectUI className={s.select} onValueChange={changeCountry} selectOptions={allCountries} value={country} />
        <SelectUI className={s.select} onValueChange={changeCity} selectOptions={allCities} value={city} />
      </div>

      <FormTextfieldArea control={control} label={'About Me'} name={'AboutMe'} rows={5} resize />
    </div>
  );
};
