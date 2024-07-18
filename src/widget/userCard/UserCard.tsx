'use client';
import { useState } from 'react';

import Block from '@/../public/assets/components/Block';
import avatarMock from '@/../public/avatar-mock.jpg';
import { appSlice } from '@/app/model/appSlice';
import { ModalKey, useAppDispatch, useModal } from '@/shared/lib';
import { Button, Typography } from '@/shared/ui';
import { ViewPhotoModal } from '@/widget/viewPhotoModal/ViewPhotoModal';
import Image from 'next/image';

import s from './UserCard.module.scss';
type Props = {};

export const UserCard = ({}: Props) => {
  const [isShowText, setIsShowText] = useState(false);
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const dispatch = useAppDispatch();
  const showViewPhotoHandler = () => {
    dispatch(appSlice.actions.toggleModal({ key: ModalKey.ViewPhoto, open: true }));
  };
  const toggleShowText = () => setIsShowText(!isShowText);

  return (
    <>
      <ViewPhotoModal openViewPhoto={isOpen} setOpenViewPhoto={setOpen} />
      <div className={s.card}>
        <div className={s.photo} onClick={showViewPhotoHandler}>
          <Image alt={'avatarMock'} src={avatarMock} />
        </div>
        <div className={s.author}>
          {/*userAvatar*/}
          <Image alt={'avatarMock'} src={avatarMock} />
          <Typography variant={'h3'}>
            {/*userName*/}
            URLProfile
          </Typography>
          {isShowText && (
            <Button className={s.blockBtn} onClick={toggleShowText}>
              <Block className={s.blockIcon} />
            </Button>
          )}
        </div>
        <Typography className={s.timeAgo} variant={'small_text'}>
          {/*реализовать логику min hour day days*/}
          22 min ago
        </Typography>
        <div className={s.descriptionBlock}>
          <Typography as={'p'} className={isShowText ? '' : s.description} variant={'regular_text_14'}>
            {/*description*/}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inc Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor inc
          </Typography>
          <Button className={s.showBtn} onClick={toggleShowText}>
            {!isShowText ? 'Show more' : 'Hide'}
          </Button>
        </div>
      </div>
    </>
  );
};
