import { useState } from 'react';

import { Meta } from '@storybook/react';
import { TabSwitcher } from '@/components/ui/tabs/TabSwitcher';

const meta = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/Tab Switcher1',
} satisfies Meta<typeof TabSwitcher>;

export default meta;

const tabsDefault = [
  { locale: 'Select1', text: 'Select1', value: 'Select1' },
  { locale: 'Select2', text: 'Select2', value: 'Select2' },
  { locale: 'Select3', text: 'Select3', value: 'Select3' },
  { locale: 'Select4', text: 'Select4', value: 'Select4' },
];

const tabsDisabled = [
  { disabled: true, locale: 'Select1', text: 'Select1', value: 'Select1' },
  { disabled: true, locale: 'Select2', text: 'Select2', value: 'Select2' },
  { disabled: true, locale: 'Select3', text: 'Select3', value: 'Select3' },
  { disabled: true, locale: 'Select4', text: 'Select4', value: 'Select4' },
];

export const Default = {
  render: () => {
    const [value, setValue] = useState('Select1');

    return <TabSwitcher onValueChange={(value) => setValue(value)} tabs={tabsDefault} value={value} />;
  },
};

export const Disabled = {
  render: () => {
    const [value, setValue] = useState('Select1');

    return <TabSwitcher onValueChange={(value) => setValue(value)} tabs={tabsDisabled} value={value} />;
  },
};
