import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { DatePicker } from './DatePicker';

interface CustomArgs {}

type StoryProps = CustomArgs;

const meta: Meta<StoryProps> = {
  argTypes: {},
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DatePicker'
};

export default meta;

const Default: StoryFn<StoryProps> = () => {
  const [date, setDate] = useState<string>(new Date('2020-01-01T00:00:00.000Z').toISOString());

  return (
    <div style={{ width: '300px' }}>
      <DatePicker onChange={(newDate: string) => setDate(newDate)} value={date} />
    </div>
  );
};

export { Default };
