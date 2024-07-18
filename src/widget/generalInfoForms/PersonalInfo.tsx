import React, { useState } from 'react';
import { Control } from 'react-hook-form';

import { DatePicker, FormTextfield, RangeDate, SelectUI, addNumberDay } from '@/shared/ui';
import { FormTextfieldArea } from '@/shared/ui/forms/FormTextFieldArea';

import s from './PersonalInfo.module.scss';
type PersonalInfoProps = {
  control: Control;
};
export const PersonalInfo = (props: PersonalInfoProps) => {
  const { control } = props;
  const [date, setDate] = useState<RangeDate>({
    endDate: addNumberDay({ date: new Date(), day: 2 }),
    startDate: new Date()
  });

  return (
    <div className={s.wrapper}>
      <FormTextfield className={s.input} control={control} label={'Username*'} name={'Username'} type={'text'} />
      <FormTextfield className={s.input} control={control} label={'First Name'} name={'FirstName'} type={'text'} />
      <FormTextfield className={s.input} control={control} label={'Last Name'} name={'LastName'} type={'text'} />
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
          className={s.select}
          value={'apple'}
        />
        <SelectUI
          selectOptions={[
            { text: 'Apple', value: 'apple' },
            { text: 'Banana', value: 'banana' },
            { text: 'Smetana', value: 'smetana' },
            { text: 'Nirvana', value: 'nirvana' }
          ]}
          className={s.select}
          value={'apple'}
        />
      </div>

      <FormTextfieldArea control={control} label={'About Me'} name={'AboutMe'} rows={5} resize />
    </div>
  );
};
