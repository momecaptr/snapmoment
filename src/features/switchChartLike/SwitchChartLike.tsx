import React, { useState } from 'react';

import { ChartLike } from '@/entities';
import { TabSwitcher } from '@/shared/ui';

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
