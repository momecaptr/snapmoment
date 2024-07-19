'use client';
import React, { useState } from 'react';

import Close from '@/../public/assets/components/Close';
import PhotoProfile from '@/shared/photoProfile/PhotoProfile';
import { Button, Card, Typography } from '@/shared/ui';
import clsx from 'clsx';
import Image from 'next/image';

import s from './AddProfilePhotoModal.module.scss';

export const AddProfilePhotoModal = () => {
  const [imagePreview, setImagePreview] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [changeMargin, setChangeMargin] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10 MB');
        setImagePreview(null);
        setChangeMargin(true);

        return;
      }

      const allowedTypes = ['image/png', 'image/jpeg'];

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Only PNG and JPEG files are allowed');
        setImagePreview(null);
        setChangeMargin(true);

        return;
      }

      const reader = new FileReader();

      setChangeMargin(false);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className={s.box}>
      <div className={s.boxTitleAndButton}>
        <Typography as={'h1'} variant={'h1'}>
          Add a Profile Photo
        </Typography>
        <Button className={s.topButton}>
          <Close height={24} width={24} />
        </Button>
      </div>
      <span className={s.line} />
      <div className={s.boxErrorMessage}>
        {errorMessage && <Typography className={s.errorMessage}>{errorMessage}</Typography>}
      </div>
      <div className={clsx(s.boxContent, changeMargin && s.changeMargin)}>
        {imagePreview ? (
          <div className={s.photoContainer}>
            <Image
              alt={'photo preview'}
              className={s.photoProfileWithCircle}
              height={340}
              src={imagePreview}
              width={332}
            />
            <div className={s.blackFone} />
          </div>
        ) : (
          <PhotoProfile />
        )}
        {!imagePreview ? (
          <div className={s.button}>
            <input className={s.customFileUpload} id={'fileInput'} onChange={handleFileChange} type={'file'} />
            <Typography as={'label'} className={s.lable} htmlFor={'fileInput'}>
              Select from Computer
            </Typography>
          </div>
        ) : (
          <Button className={s.buttonSave}>Save</Button>
        )}
      </div>
    </Card>
  );
};
