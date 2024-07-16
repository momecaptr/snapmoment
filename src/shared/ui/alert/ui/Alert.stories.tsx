import type { Meta } from '@storybook/react';

import StoreProvider from '@/app/StoreProvider';
import { Alert } from '@/shared/ui';
import useAlert from '@/shared/ui/alert/lib/hooks/useAlert';
import { Button } from '@/shared/ui/button/Button';

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
