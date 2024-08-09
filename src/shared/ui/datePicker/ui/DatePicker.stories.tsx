import { useState } from 'react';

import { Button, DatePicker } from '@/shared/ui';
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
  const [date, setDate] = useState<Date>(new Date('2020-01-01'));

  return (
    <>
      <div style={{ marginBottom: '50px', width: '300px' }}>
        <DatePicker onChange={setDate} value={date} />
      </div>
      <Button onClick={() => console.log('stories-date', date)}>show date in console</Button>
    </>
  );
};

export { Defoult };
