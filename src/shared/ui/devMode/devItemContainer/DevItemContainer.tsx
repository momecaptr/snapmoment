import React, { ReactNode, useState } from 'react';

import ArrowIosDownOutline from '@/../public/assets/components/ArrowIosDownOutline';
import { Button } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './DevItem.module.scss';

type Props = {
  children?: ReactNode;
  title: string;
};

const DevItemContainer = (props: Props) => {
  const { children, title } = props;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <Button
        as={'p'}
        className={clsx(s.devSideBarBnt, isSideBarOpen && s.active)}
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        variant={'text'}
      >
        <p className={s.itemTitle}>
          {title}
          <ArrowIosDownOutline className={s.iconArrowDown} />
        </p>
      </Button>
      {isSideBarOpen && children}
    </>
  );
};

export default DevItemContainer;
