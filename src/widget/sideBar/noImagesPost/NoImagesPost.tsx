import React, { ChangeEvent, useRef } from 'react';

import PhotoStub from '@/../public/assets/components/PhotoStub';
import { Button, Typography } from '@/shared/ui';

import s from './NoImagesPost.module.scss';

type NoImagesPostType = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const NoImagesPost = (props: NoImagesPostType) => {
  const { onSelectFile } = props;
  const inputRef = useRef(null);

  return (
    <>
      <div className={s.boxPhoto}>
        <PhotoStub />
      </div>
      <div className={s.button}>
        <input
          className={s.upload}
          id={'fileInput'}
          name={'file'}
          onChange={(e) => onSelectFile(e)}
          ref={inputRef}
          type={'file'}
        />
        <Typography as={'label'} className={s.label} htmlFor={'fileInput'}>
          Select from Computer
        </Typography>
      </div>
      <Button className={s.draftBtn} variant={'outlined'}>
        <Typography className={s.draftTxt}>Open Draft</Typography>
      </Button>
    </>
  );
};
