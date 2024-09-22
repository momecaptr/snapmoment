import React, { ChangeEvent, useRef } from 'react';

import PictureOutline from '@/../public/assets/components/PictureOutline';
import PlusCircleOutline from '@/../public/assets/components/PlusCircleOutline';
import TrashOutline from '@/../public/assets/components/TrashOutline';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, CustomDropdownItem, CustomDropdownWrapper } from '@/shared/ui';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { clsx } from 'clsx';
import Image from 'next/image';

import s from './AddNewImgPanel.module.scss';

type Props = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectImageSwiper: (index: number) => void;
  swiperIndex?: number;
};

export const AddNewImgPanel = (props: Props) => {
  const { onSelectFile, onSelectImageSwiper, swiperIndex } = props;
  const selectImgInputRef = () => inputRef.current?.click();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);

  const handleDeletePhoto = (index: string) => {
    dispatch(createPostActions.deletePhoto({ id: index }));
  };

  return (
    <div className={s.container}>
      <CustomDropdownWrapper
        trigger={
          <div className={s.opener}>
            <PictureOutline style={{ height: '24px', width: '24px' }} />
          </div>
        }
        align={'end'}
        className={s.contentWrapper}
        isArrow={false}
        side={'top'}
        sideOffset={2}
        stayOpen
      >
        <CustomDropdownItem className={s.content} onSelect={(event) => event.preventDefault()}>
          <div className={s.imgs}>
            {allPostImages.map((photo, index) => (
              <div
                className={clsx(s.imgWrapper, swiperIndex === index && s.active)}
                key={photo.id}
                onClick={() => onSelectImageSwiper(index)}
              >
                <Image alt={''} className={s.img} height={82} src={photo.imageUrl || ''} width={80} />
                <div className={s.deleteImg} onClick={() => handleDeletePhoto(photo.id)}>
                  <TrashOutline className={s.deleteIcon} />
                </div>
              </div>
            ))}
          </div>
          <Button
            className={s.button}
            disabled={allPostImages.length === 10}
            onClick={selectImgInputRef}
            type={'button'}
            variant={'outlined'}
          >
            <PlusCircleOutline style={{ height: '36px', width: '36px' }} />
          </Button>
          <input
            accept={'image/jpeg, image/png'}
            id={'fileInput'}
            name={'file'}
            onChange={onSelectFile}
            ref={inputRef}
            style={{ display: 'none' }}
            type={'file'}
          />
        </CustomDropdownItem>
      </CustomDropdownWrapper>
    </div>
  );
};
