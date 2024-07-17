import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@/shared/ui';

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular_text_16',
        'bold_text_16',
        'regular_text_14',
        'medium_text_14',
        'bold_text_14',
        'small_text',
        'semi_bold_small_text',
        'regular_link',
        'small_link'
      ]
    }
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography'
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyLarge: Story = {
  args: {
    children: 'Card content',
    variant: 'large'
  }
};

export const MyH1: Story = {
  args: {
    children: 'Card content',
    variant: 'h1'
  }
};

export const MyH2: Story = {
  args: {
    children: 'Card content',
    variant: 'h2'
  }
};

export const MyH3: Story = {
  args: {
    children: 'Card content',
    variant: 'h3'
  }
};

export const Regular_text_16: Story = {
  args: {
    children: 'Card content',
    variant: 'regular_text_16'
  }
};

export const Bold_text_16: Story = {
  args: {
    children: 'Card content',
    variant: 'bold_text_16'
  }
};

export const Regular_text_14: Story = {
  args: {
    children: 'Card content',
    variant: 'regular_text_14'
  }
};

export const Medium_text_14: Story = {
  args: {
    children: 'Card content',
    variant: 'medium_text_14'
  }
};

export const Bold_text_14: Story = {
  args: {
    children: 'Card content',
    variant: 'bold_text_14'
  }
};

export const Small_text: Story = {
  args: {
    children: 'Card content',
    variant: 'small_text'
  }
};

export const Semi_bold_small_text: Story = {
  args: {
    children: 'Card content',
    variant: 'semi_bold_small_text'
  }
};

export const Regular_link: Story = {
  args: {
    children: 'Card content',
    variant: 'regular_link'
  }
};

export const Small_link: Story = {
  args: {
    children: 'Card content',
    variant: 'small_link'
  }
};
