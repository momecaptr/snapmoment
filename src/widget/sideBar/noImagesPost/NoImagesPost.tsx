import React, { ChangeEvent, useRef } from 'react';

import PhotoStub from '@/../public/assets/components/PhotoStub';
import { useAppDispatch, useAppSelector, useCustomToast } from '@/shared/lib';
import { Button, Typography } from '@/shared/ui';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';

import s from './NoImagesPost.module.scss';

type NoImagesPostType = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const NoImagesPost = (props: NoImagesPostType) => {
  const { onSelectFile } = props;
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const { showToast } = useCustomToast();
  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.removeItem('createPost');
    onSelectFile(e);
  };

  const handleOpenDraft = () => {
    if (!allPostImages.length && localStorage.getItem('createPost')) {
      dispatch(createPostActions.setAllPostImgs({ images: JSON.parse(localStorage.getItem('createPost') || '') }));
    } else {
      showToast({ message: 'No images saved', type: 'error' });
    }
  };

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
          onChange={handleSelectFile}
          ref={inputRef}
          type={'file'}
        />
        <Typography as={'label'} className={s.label} htmlFor={'fileInput'}>
          Select from Computer
        </Typography>
      </div>
      <Button className={s.draftBtn} onClick={handleOpenDraft} variant={'outlined'}>
        <Typography className={s.draftTxt}>Open Draft</Typography>
      </Button>
    </>
  );
};
