import type { Meta } from '@storybook/react';

import { useState } from 'react';

import { AlertProvider } from '@/components/ui/alert/model/AlertProvider';
import { AlertProps } from '@/components/ui/alert/types/types';
import { Alert } from '@/components/ui/alert/ui/Alert';

export default {
  component: Alert,
  decorators: [
    (Story) => (
      <AlertProvider>
        <Story />
      </AlertProvider>
    )
  ],
  tags: ['autodocs'],
  title: 'Components/Alert'
} as Meta;

const Template = (args: any) => {
  const [alerts, setAlerts] = useState<AlertProps[]>(args.alerts);

  const removeAlert = (id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return <Alert alerts={alerts} removeAlert={removeAlert} />;
};

export const Success = {
  args: {
    alerts: [{ id: '1', message: 'Now you see the success message!', type: 'success' }]
  },
  render: (args: any) => <Template {...args} />
};
export const Error = {
  args: {
    alerts: [{ id: '2', message: 'Now you see the error message!', type: 'error' }]
  },
  render: (args: any) => <Template {...args} />
};
