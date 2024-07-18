'use client';
import React, { useState } from 'react';

import { Button } from '@/shared/button/Button';
import { Card } from '@/shared/card/Card';
import PhotoProfile from '@/shared/photoProfile/PhotoProfile';
import { Typography } from '@/shared/typography/Typography';
import clsx from 'clsx';
import Image from 'next/image';

import s from './ModalAddPhoto.module.scss';

import Close from '../../../../public/assets/components/Close';

const ModalAddPhoto = () => {
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
        <Button className={s.topButton} variant={'text'}>
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
              alt={'Превью фото'}
              className={s.photoProfileWithCircle}
              height={340}
              src={imagePreview}
              width={332}
            />
            <div className={s.blackFone} />
          </div>
        ) : (
          <PhotoProfile className={s.photoProfile} />
        )}
        {!imagePreview ? (
          <div className={s.butoon}>
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

export default ModalAddPhoto;
