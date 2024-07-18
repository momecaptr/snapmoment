import React, { useState } from 'react';
import { Control } from 'react-hook-form';

import { addNumberDay } from '@/shared/datePicker/lib/helpers/addNumberDay';
import { DatePicker, RangeDate } from '@/shared/datePicker/ui/DatePicker';
import { FormTextfieldArea } from '@/shared/forms/FormTextFieldArea';
import { FormTextfield } from '@/shared/forms/FormTextfield';
import { SelectUI } from '@/shared/select/Select';

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
