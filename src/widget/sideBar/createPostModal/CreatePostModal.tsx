import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
import PhotoStub from '@/../public/assets/components/PhotoStub';
import { Button, Modal, Typography } from '@/shared/ui';
import { processImage } from '@/widget/sideBar/lib/processImage';
import { PhotoContainer } from '@/widget/sideBar/photoContainer/PhotoContainer';
import clsx from 'clsx';

import s from './CreatePostModal.module.scss';

type PropsCrPostModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};
export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const [previewOrPreviews, setPreviewOrPreviews] = useState<string[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const isProcessed = processImage(file, setPreviewOrPreviews, setErrorMessage);

      if (isProcessed) {
        if (cover?.lastModified === file.lastModified && cover?.name === file.name) {
          setCover(null);
        } else {
          setCover(file);
        }
      } else {
        setCover(null);
      }
    }
    e.target.value = '';
  };

  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      processImage(file, setPreviewOrPreviews, setErrorMessage);
    }

    e.target.value = '';
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal
      backButton={
        previewOrPreviews.length ? (
          <Button onClick={() => setPreviewOrPreviews([])}>
            <ArrowIosBackOutline />
          </Button>
        ) : null
      }
      className={s.createPostModal}
      nextButton={previewOrPreviews.length ? <Button onClick={() => console.log('NEXT')}>Next</Button> : null}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      showCloseButton={!(previewOrPreviews.length > 0)}
      title={previewOrPreviews.length ? 'Cropping' : 'Add Photo'}
    >
      {/* todo НЕ ЗАБУДЬ ДОБАВИТЬ Button submit*/}
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {/*todo Ошибки откидывать в еще одной модалке или в toast*/}
        {/*<Typography as={'h1'} variant={'h1'}>*/}
        {/*  <div className={s.boxErrorMessage}>*/}
        {/*    {errorMessage && (*/}
        {/*      <Typography className={s.errorMessage} variant={'regular_text_16'}>*/}
        {/*        {errorMessage}*/}
        {/*      </Typography>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</Typography>*/}
        <div className={clsx(s.boxContent)}>
          {previewOrPreviews.length ? (
            <>
              <PhotoContainer addImage={addImgHandler} images={previewOrPreviews} />
              {/*todo Тут должно быть не save, а куча всякой хуйни: cropping, filters*/}
              <div className={s.croppingArea}>
                <div>
                  <Button>Ratio</Button>
                  <Button>Scale</Button>
                </div>
                {/*todo открывает картинку */}
                <Button>ImgIcon</Button>
              </div>
            </>
          ) : (
            <>
              <div className={s.boxPhoto}>
                <PhotoStub />
              </div>
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
              <Button className={s.draftBtn} variant={'outlined'}>
                <Typography className={s.draftTxt}>Open Draft</Typography>
              </Button>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};
