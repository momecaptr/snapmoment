import { useCustomToast } from '@/shared/lib';
import { Button, CustomToast } from '@/shared/ui';
import { StoryProps } from '@storybook/blocks';
import { Meta, StoryFn } from '@storybook/react';
import { Toaster } from 'sonner';

const meta = {
  component: CustomToast,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position={'bottom-left'} />
      </>
    )
  ],
  tags: ['autodocs'],
  title: 'Components/CustomToast'
} satisfies Meta<typeof CustomToast>;

export default meta;

const Success: StoryFn<StoryProps> = (args: StoryProps) => {
  const { showToast } = useCustomToast();

  return <Button onClick={() => showToast({ message: 'Operation successful!', type: 'success' })}>success</Button>;
};

const Error: StoryFn<StoryProps> = (args: StoryProps) => {
  const { showToast } = useCustomToast();

  return <Button onClick={() => showToast({ message: 'Something went wrong!', type: 'error' })}>error</Button>;
};

export { Error, Success };
