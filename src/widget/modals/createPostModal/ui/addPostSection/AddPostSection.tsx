import React, { ChangeEvent, useRef } from 'react';

import PhotoStub from '@/../public/assets/components/PhotoStub';
import { useAppDispatch, useAppSelector, useCustomToast } from '@/shared/lib';
import { Button, Typography } from '@/shared/ui';

import s from './AddPostSection.module.scss';

import { createPostActions, createPostSelectors } from '../../service/createPostSlice';

type AddImgSectionType = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const AddPostSection = (props: AddImgSectionType) => {
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
      dispatch(createPostActions.setActiveSection({ section: 'Cropping' }));
      dispatch(createPostActions.setAllPostImgs({ images: JSON.parse(localStorage.getItem('createPost') as string) }));
    } else {
      showToast({ message: 'No images saved', type: 'error' });
    }
  };

  return (
    <>
      <div className={s.boxPhoto}>
        <PhotoStub />
      </div>
      <div className={s.buttonsWrapper}>
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
        {localStorage.getItem('createPost') && (
          <Button className={s.draftBtn} onClick={handleOpenDraft} variant={'outlined'}>
            <Typography className={s.draftTxt}>Open Draft</Typography>
          </Button>
        )}
      </div>
    </>
  );
};
