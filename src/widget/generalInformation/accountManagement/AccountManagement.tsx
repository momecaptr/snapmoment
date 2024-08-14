import React from 'react';

import { Radio, Wrapper } from '@/shared/ui';

import s from './AccountManagement.module.scss';
export const AccountManagement = () => {
  return (
    <div className={s.box}>
      <Wrapper variant={'withoutStyles'}>
        <Radio.Root className={s.radioRoot} name={'grade'}>
          <Radio.Item value={'1 radio'}>Personal</Radio.Item>
          <Radio.Item value={'2 radio'}>Business</Radio.Item>
        </Radio.Root>
      </Wrapper>
    </div>
  );
};
