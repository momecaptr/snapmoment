import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { SelectUI } from '@/shared/ui';

const meta = {
  component: SelectUI,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
  title: 'Components/SelectUI'
} satisfies Meta<typeof SelectUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [value, setValue] = useState(args.value);

  return (
    <SelectUI
      {...args}
      onValueChange={(newValue: string) => {
        setValue(newValue);
      }}
      value={value}
    />
  );
};

export const Default: Story = {
  args: {
    selectOptions: [
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Smetana', value: 'smetana' },
      { text: 'Nirvana', value: 'nirvana' }
    ],
    value: 'apple'
  },
  render: (args) => <Template {...args} />
};
