import * as React from 'react';

import { Button } from '@/shared/ui';

import s from './ToggleDescription.module.scss';
type Props = {
  isLength: boolean;
  isShowText: boolean;
  toggleShowText: () => void;
};

export const ToggleDescription = ({ isLength, isShowText, toggleShowText }: Props) => {
  return (
    <>
      {isLength && (
        <Button className={s.showBtn} onClick={toggleShowText}>
          {isShowText ? 'Hide' : 'Show more'}
        </Button>
      )}
    </>
  );
};
