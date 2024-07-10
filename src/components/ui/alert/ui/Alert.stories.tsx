import type { Meta } from '@storybook/react';

import StoreProvider from '@/app/StoreProvider';
import useAlert from '@/components/ui/alert/lib/hooks/useAlert';
import Alert from '@/components/ui/alert/ui/Alert';

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
      <button onClick={alertVariant} style={{ backgroundColor: '#397df6' }}>
        Сlick to see the alerts{' '}
      </button>
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
