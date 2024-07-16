import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/shared/ui';

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/input'
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Text',
    placeholder: 'Input',
    type: 'text'
  }
};

export const DefaultPassword: Story = {
  args: {
    disabled: false,
    label: 'Text',
    placeholder: 'Input',
    type: 'password'
  }
};

export const DefaultSearch: Story = {
  args: {
    disabled: false,
    label: 'Text',
    placeholder: 'Input',
    type: 'search'
  }
};

export const Error: Story = {
  args: {
    disabled: false,
    error: 'Error!',
    label: 'Text',
    placeholder: 'Input',
    type: 'text'
  }
};

export const ErrorPassword: Story = {
  args: {
    disabled: false,
    error: 'Error!',
    label: 'Text',
    placeholder: 'Input',
    type: 'password'
  }
};

export const ErrorSearch: Story = {
  args: {
    disabled: false,
    error: 'Error!',
    label: 'Text',
    placeholder: 'Input',
    type: 'search'
  }
};

export const Disable: Story = {
  args: {
    disabled: true,
    label: 'Text',
    placeholder: 'Input',
    type: 'text'
  }
};

export const DisablePassword: Story = {
  args: {
    disabled: true,
    label: 'Text',
    placeholder: 'Input',
    type: 'password'
  }
};

export const DisableSearch: Story = {
  args: {
    disabled: true,
    label: 'Text',
    placeholder: 'Input',
    type: 'search'
  }
};

export const DisableError: Story = {
  args: {
    disabled: true,
    error: 'Error!',
    label: 'Text',
    placeholder: 'Input',
    type: 'text'
  }
};

export const DisableErrorPassword: Story = {
  args: {
    disabled: true,
    error: 'Error!',
    label: 'Text',
    placeholder: 'Input',
    type: 'password'
  }
};

export const DisableErrorSearch: Story = {
  args: {
    disabled: true,
    error: 'Error!',
    label: 'Text',
    placeholder: 'Input',
    type: 'search'
  }
};
