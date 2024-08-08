import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSetMainPhotoProfileMutation } from '@/shared/api/mainPhotoProfile/mainPhotoProfileAPI';
import { Button, Modal, PhotoProfile, Typography } from '@/shared/ui';
import { clsx } from 'clsx';
import Image from 'next/image';

import s from './AddProfilePhotoModal.module.scss';

type Props = {
  openViewPhoto: boolean;
  setOpenViewPhoto: (openViewPhoto: boolean) => void;
};

export const AddProfilePhotoModal = (props: Props) => {
  const { openViewPhoto, setOpenViewPhoto } = props;

  const [preview, setPreview] = useState<null | string>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [setMainPhotoProfile, { isLoading }] = useSetMainPhotoProfileMutation();

  const handleClose = () => {
    setOpenViewPhoto(false);
  };

  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);

      if (!isValidSize) {
        setErrorMessage('Error! Photo size must be less than 10 MB!');
        setPreview(null);
        setCover(null);

        return;
      }

      if (!isValidType) {
        setErrorMessage('Error! The format of the uploaded photo must be\n' + 'PNG and JPEG');
        setPreview(null);
        setCover(null);

        return;
      }

      setErrorMessage(null);
      const objectUrl = URL.createObjectURL(file);

      setPreview(objectUrl);

      if (cover?.lastModified === file.lastModified && cover?.name === file.name) {
        setCover(null);
      } else {
        setCover(file);
      }
    }
    e.target.value = '';
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = async (data: any) => {
    if (cover) {
      handleClose();
      await setMainPhotoProfile({ data: cover });
    }

    setPreview(null);
    setCover(null);
  };

  return (
    <Modal className={s.box} onOpenChange={handleClose} open={openViewPhoto} title={'Add a Profile Photo'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Typography as={'h1'} variant={'h1'}>
            <div className={s.boxErrorMessage}>
              {errorMessage && (
                <Typography className={s.errorMessage} variant={'regular_text_16'}>
                  {errorMessage}
                </Typography>
              )}
            </div>
          </Typography>
          <div className={clsx(s.boxContent)}>
            {preview ? (
              <div className={s.photoContainer}>
                <Image
                  alt={'photo preview'}
                  className={s.photoProfileWithCircle}
                  height={340}
                  src={preview}
                  width={332}
                />
                <div className={s.blackFone} />
              </div>
            ) : (
              <PhotoProfile height={222} width={228} square />
            )}
            {!preview ? (
              <div className={s.button}>
                <input
                  className={s.customFileUpload}
                  id={'fileInput'}
                  name={'file'}
                  onChange={handleInputImg}
                  type={'file'}
                />
                <Typography as={'label'} className={s.lable} htmlFor={'fileInput'}>
                  Select from Computer
                </Typography>
              </div>
            ) : (
              <Button className={s.buttonSave} type={'submit'}>
                <Typography variant={'regular_text_16'}>Save</Typography>
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
