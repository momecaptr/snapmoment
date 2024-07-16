import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/shared/ui';

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary']
    }
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button'
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary',
    disabled: false,
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    disabled: false,
    variant: 'secondary'
  }
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary'
  }
};
export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'primary'
  }
};
