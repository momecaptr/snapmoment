import React, { ChangeEvent, useRef } from 'react';

import Close from '@/../public/assets/components/Close';
import ImageIcon from '@/../public/assets/components/Image';
import ImageOutline from '@/../public/assets/components/ImageOutline';
import PlusCircleOutline from '@/../public/assets/components/PlusCircleOutline';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, CustomDropdownItem, CustomDropdownWrapper } from '@/shared/ui';
import { clsx } from 'clsx';
import Image from 'next/image';

import s from './AddNewImgPanel.module.scss';

import { createPostActions, createPostSelectors } from '../../../service/createPostSlice';

type Props = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectImageSwiper: (index: number) => void;
  swiperIndex?: number;
};
/**
 * Компонент `AddNewImgPanel` — панель для добавления новых изображений с возможностью выбора и удаления изображений.
 *
 * @param {function} onSelectFile * Обработчик события изменения файла, вызываемый при выборе изображения.
 * @param {function} onSelectImageSwiper * Функция для выборе изображения из карусели, с передачей индекса выбранного изображения.
 * @param {number} [swiperIndex] * Индекс текущего изображения в карусели (если применимо).
 */
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
            <ImageOutline style={{ height: '24px', width: '24px' }} />
          </div>
        }
        triggerActive={
          <div className={s.openerActive}>
            <ImageIcon style={{ height: '24px', width: '24px' }} />
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
                <Image alt={''} className={s.img} height={82} src={photo.originUrl || ''} width={80} />
                <div className={s.deleteImg} onClick={() => handleDeletePhoto(photo.id)}>
                  <Close className={s.deleteIcon} />
                </div>
              </div>
            ))}
          </div>
          <Button
            className={s.button}
            disabled={allPostImages.length === 10}
            onClick={selectImgInputRef}
            type={'button'}
            variant={'text'}
          >
            <PlusCircleOutline style={{ height: '24px', width: '24px' }} />
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
