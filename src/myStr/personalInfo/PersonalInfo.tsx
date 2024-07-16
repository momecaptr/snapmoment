import React from 'react';
import { useForm } from 'react-hook-form';

import { SchemaType, schema } from '@/features/schemas/signInSignUpSchema';
import { DatePicker } from '@/shared/datePicker/ui/DatePicker';
import { FormTextfieldArea } from '@/shared/forms/FormTextFieldArea';
import { FormTextfield } from '@/shared/forms/FormTextfield';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@radix-ui/react-select';

import s from './PersonalInfo.module.scss';

const PersonalInfo = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm<SchemaType>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: SchemaType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.wrapper}>
        <FormTextfield className={s.input} control={control} label={'Username*'} name={'email'} type={'email'} />
        <FormTextfield className={s.input} control={control} label={'First Name'} name={'password'} type={'password'} />
        <FormTextfield className={s.input} control={control} label={'Last Name'} name={'email'} type={'email'} />
        <FormTextfield className={s.input} control={control} label={'Last Name'} name={'email'} type={'email'} />
        <DatePicker
          value={{
            endDate: new Date('2024-07-17T18:55:17.030Z'),
            startDate: new Date('2024-07-15T18:55:17.030Z')
          }}
          onChange={() => {}}
        />
        <Select />
        <Select />
        <FormTextfieldArea label={'About Me'} name={'text'} rows={5} resize />
      </div>
    </form>
  );
};

export default PersonalInfo;
