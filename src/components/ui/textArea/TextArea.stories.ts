import type { Meta, StoryObj } from '@storybook/react';

import TextArea from '@/components/ui/textArea/TextArea';

const meta = {
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/textArea'
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    label: 'TextArea',
    placeholder: 'TextArea'
  }
};
export const Error: Story = {
  args: {
    disabled: false,
    error: 'Error!',
    label: 'TextArea',
    placeholder: 'TextArea'
  }
};

export const NotResize: Story = {
  args: {
    disabled: false,
    label: 'TextArea',
    placeholder: 'TextArea',
    resize: true
  }
};

export const Disable: Story = {
  args: {
    disabled: true,
    label: 'TextArea',
    placeholder: 'TextArea'
  }
};
