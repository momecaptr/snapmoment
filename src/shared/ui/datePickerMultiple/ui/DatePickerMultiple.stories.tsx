import { useState } from 'react';

import { addNumberDayMultiple } from '@/shared/ui/datePickerMultiple/lib';
import { DatePickerMultiple, RangeDateMultiple } from '@/shared/ui/datePickerMultiple/ui/DatePickerMultiple';
import { Meta, StoryFn } from '@storybook/react';

interface CustomArgs {}

type StoryProps = CustomArgs;

const meta: Meta<StoryProps> = {
  argTypes: {},
  component: DatePickerMultiple,
  tags: ['autodocs'],
  title: 'Components/DatePickerMultiple'
};

export default meta;

const Defoult: StoryFn<StoryProps> = (args: StoryProps) => {
  const [date, setDate] = useState<RangeDateMultiple>({
    endDate: addNumberDayMultiple({ date: new Date(), day: 2 }),
    startDate: new Date()
  });

  return (
    <>
      <div style={{ width: '300px' }}>
        <DatePickerMultiple onChange={setDate} value={date} />
      </div>
    </>
  );
};

export { Defoult };
