import React, { useState } from 'react';

import { ChartLike } from '@/entities/chartLike/ChartLike';
import { TabSwitcher } from '@/shared/tabs/TabSwitcher';

import s from './SwitchChartLike.module.scss';

const tabsDefault = [
  { locale: '', text: '', value: 'Week' },
  { locale: '', text: '', value: 'Month' }
];

export const SwitchChartLike = () => {
  const [value, setValue] = useState('Month');

  return (
    <>
      <ChartLike>
        <TabSwitcher className={s.tabSwitcher} onValueChange={(v) => setValue(v)} tabs={tabsDefault} value={value} />
      </ChartLike>
    </>
  );
};
