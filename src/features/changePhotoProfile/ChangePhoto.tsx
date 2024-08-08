import React, { useState } from 'react';

import DeletePhoto from '@/../public/Delet photo.svg';
import { selectIsPhotoInState } from '@/myApp/model/appSelectors';
import { useDeleteMainPhotoProfileMutation } from '@/shared/api/mainPhotoProfile/mainPhotoProfileAPI';
import { useAppSelector } from '@/shared/lib';
import { Button, PhotoProfile } from '@/shared/ui';
import { DeletePhotoModal } from '@/widget';
import Image from 'next/image';

import s from './ChangePhoto.module.scss';

type Props = {
  deletePhoto?: boolean;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const ChangePhoto = (props: Props) => {
  const { deletePhoto = false, isOpen, setOpen } = props;
  const [isOpenDeletePhoto, setIsOpenDeletePhoto] = useState(false);
  const isPhotoInState = useAppSelector(selectIsPhotoInState);
  const [deletePhotoProfile] = useDeleteMainPhotoProfileMutation();

  const onChangeDeletePhoto = () => {
    setIsOpenDeletePhoto(!isOpenDeletePhoto);
  };

  return (
    <>
      <DeletePhotoModal
        deletePhotoProfile={deletePhotoProfile}
        isOpen={isOpenDeletePhoto}
        setOpen={setIsOpenDeletePhoto}
      />

      <div className={s.box}>
        {isPhotoInState && deletePhoto && (
          <div className={s.deletePhoto} onClick={onChangeDeletePhoto}>
            <Image alt={'Delete photo'} height={24} src={DeletePhoto} width={24} />
          </div>
        )}
        <PhotoProfile />
        <Button className={s.button} onClick={() => setOpen(!isOpen)} variant={'outlined'}>
          Add a Profile Photo
        </Button>
      </div>
    </>
  );
};
