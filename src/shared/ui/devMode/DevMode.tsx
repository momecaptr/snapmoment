import React, { useState } from 'react';

import { Button } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './DevMode.module.scss';

import DevItemContainer from './devItemContainer/DevItemContainer';
import { DevSideBar } from './devSideBar/DevSideBar';

type Props = {
  isActive?: boolean;
};

export const DevMode = (props: Props) => {
  const { isActive = false } = props;
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const toggleWindow = () => {
    setIsWindowOpen(!isWindowOpen);
  };

  return (
    <>
      {isActive && (
        <div className={s.wrapper}>
          <Button className={s.devModeBtn} onClick={toggleWindow} variant={'outlined'}>
            &lt;DevMode/&gt;
          </Button>
          {isWindowOpen && (
            <div className={clsx(s.window, isWindowOpen && s.active)}>
              <p className={s.windowTitle}>This is the DevMode window!</p>

              <DevItemContainer title={'DevSideBar'}>
                <DevSideBar />
              </DevItemContainer>

              <DevItemContainer title={'Other'}>
                <p style={{ color: 'var(--light-900)' }}>Coming soon..</p>

                {/* Сюда можете добавить дополнительные элементы по мере необходимости */}
              </DevItemContainer>

              {/*Для того чтобы удобно создать новый раздел можно использовать DevItemContainer*/}
            </div>
          )}
        </div>
      )}
    </>
  );
};
