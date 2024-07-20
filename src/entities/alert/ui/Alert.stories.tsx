import type { Meta } from '@storybook/react';

import { Alert, useAlert } from '@/entities';
import StoreProvider from '@/myApp/StoreProvider';
import { Button } from '@/shared/ui';

const meta = {
  component: Alert,
  decorators: [
    (Story: any) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    )
  ],
  tags: ['autodocs'],
  title: 'Components/Alert'
} satisfies Meta<typeof Alert>;

export default meta;

const Template = (args: any) => {
  const { errorAlert, successAlert } = useAlert();

  const alertVariant = () => {
    if (args.type === 'success') {
      successAlert({ message: 'Now you see the success message!' });
    } else {
      errorAlert({ message: 'Now you see the error message!' });
    }
  };

  return (
    <>
      <Button onClick={alertVariant}>Сlick to see the alerts </Button>
      <Alert />
    </>
  );
};

export const Success = {
  args: {
    type: 'success'
  },
  render: (args: any) => <Template {...args} />
};

export const Error = {
  args: {
    type: 'error'
  },
  render: (args: any) => <Template {...args} />
};
