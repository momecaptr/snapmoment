import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { SchemaType, schema } from '@/features/schemas/signInSignUpSchema';
import { addNumberDay } from '@/shared/datePicker/lib/helpers/addNumberDay';
import { DatePicker, RangeDate } from '@/shared/datePicker/ui/DatePicker';
import { FormTextfieldArea } from '@/shared/forms/FormTextFieldArea';
import { FormTextfield } from '@/shared/forms/FormTextfield';
import { SelectUI } from '@/shared/select/Select';
import { zodResolver } from '@hookform/resolvers/zod';

import s from './PersonalInfo.module.scss';

const PersonalInfo = () => {
  const [date, setDate] = useState<RangeDate>({
    endDate: addNumberDay({ date: new Date(), day: 2 }),
    startDate: new Date()
  });

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
        <div className={s.datePickerBox}>
          <DatePicker onChange={setDate} value={date} />
        </div>
        <div className={s.selectBox}>
          <SelectUI
            selectOptions={[
              { text: 'Apple', value: 'apple' },
              { text: 'Banana', value: 'banana' },
              { text: 'Smetana', value: 'smetana' },
              { text: 'Nirvana', value: 'nirvana' }
            ]}
            value={'apple'}
          />
          <SelectUI
            selectOptions={[
              { text: 'Apple', value: 'apple' },
              { text: 'Banana', value: 'banana' },
              { text: 'Smetana', value: 'smetana' },
              { text: 'Nirvana', value: 'nirvana' }
            ]}
            value={'apple'}
          />
        </div>

        <FormTextfieldArea label={'About Me'} name={'text'} rows={5} resize />
      </div>
    </form>
  );
};

export default PersonalInfo;
