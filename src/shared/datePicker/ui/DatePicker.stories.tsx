import { useState } from 'react';

import { addNumberDay } from '@/shared/datePicker/lib/helpers/addNumberDay';
import { DatePicker, RangeDate } from '@/shared/datePicker/ui/DatePicker';
import { Meta, StoryFn } from '@storybook/react';

interface CustomArgs {}

type StoryProps = CustomArgs;

const meta: Meta<StoryProps> = {
  argTypes: {},
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DatePicker'
};

export default meta;

const Defoult: StoryFn<StoryProps> = (args: StoryProps) => {
  const [date, setDate] = useState<RangeDate>({
    endDate: addNumberDay({ date: new Date(), day: 2 }),
    startDate: new Date()
  });

  return (
    <>
      <div style={{ width: '300px' }}>
        <DatePicker onChange={setDate} value={date} />
      </div>
    </>
  );
};

export { Defoult };
