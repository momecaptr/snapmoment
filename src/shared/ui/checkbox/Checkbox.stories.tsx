import { useState } from 'react';

import { Checkbox } from '@/shared/ui';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  argTypes: {
    onCheckedChange: { action: 'checked' }
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'COMPONENTS/Checkbox'
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    id: 'checked-checkbox',
    label: 'Click me'
  }
};

export const Unchecked: Story = {
  args: {
    checked: false,
    disabled: false,
    id: 'unchecked-checkbox',
    label: 'Click me'
  }
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    id: 'disabled-unchecked-checkbox',
    label: 'Click me'
  }
};

export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    disabled: true,
    id: 'disabled-checked-checkbox',
    label: 'Click me'
  }
};

export const Controlled: Story = {
  args: {
    label: 'Click me'
  },
  render: (args) => {
    const [checked, setChecked] = useState(true);

    return <Checkbox {...args} checked={checked} onCheckedChange={() => setChecked(!checked)} />;
  }
};
