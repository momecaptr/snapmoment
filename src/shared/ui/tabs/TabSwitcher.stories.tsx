import { useState } from 'react';

import { TabSwitcher } from '@/shared/ui';
import { Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof TabSwitcher> = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/Tab Switcher'
};

export default meta;
type Story = StoryObj<typeof meta>;

const tabsDefault = [
  { locale: 'Select1', text: 'Select1', value: 'Select1' },
  { locale: 'Select2', text: 'Select2', value: 'Select2' },
  { locale: 'Select3', text: 'Select3', value: 'Select3' },
  { locale: 'Select4', text: 'Select4', value: 'Select4' }
];

const tabsDisabled = [
  { disabled: true, locale: 'Select1', text: 'Select1', value: 'Select1' },
  { disabled: true, locale: 'Select2', text: 'Select2', value: 'Select2' },
  { disabled: true, locale: 'Select3', text: 'Select3', value: 'Select3' },
  { disabled: true, locale: 'Select4', text: 'Select4', value: 'Select4' }
];

const Template = (args: any) => {
  const [value, setValue] = useState('Select1');

  return <TabSwitcher {...args} onValueChange={(value) => setValue(value)} value={value} />;
};

export const Default: Story = {
  args: {
    tabs: tabsDefault
  },
  render: (args) => <Template {...args} />
};
export const Disabled: Story = {
  args: {
    tabs: tabsDisabled
  },
  render: (args) => <Template {...args} />
};
