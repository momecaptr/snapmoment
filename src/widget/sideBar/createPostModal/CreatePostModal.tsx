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

type Sections = 'Cropping' | 'Filters' | 'Publication';

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const [previews, setPreviews] = useState<string[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [activeSection, setActiveSection] = useState<Sections>('Cropping');

  const navigateBtn = (direction: 'back' | 'next') => {
    switch (activeSection) {
      case 'Cropping':
        if (direction === 'back') {
          // Если находимся в Cropping и нажали backButton, сбрасываем превью
          setPreviews([]);
        } else {
          // Переключаемся на Publication
          setActiveSection('Filters');
        }
        break;
      case 'Filters':
        if (direction === 'back') {
          setActiveSection('Cropping');
        } else {
          setActiveSection('Publication');
        }
        break;
      case 'Publication':
        if (direction === 'back') {
          // Переключаемся на Cropping
          setActiveSection('Filters');
        } else {
          // todo Настроить действие для отправки формы
          console.log('отправить');
        }
        break;
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const isProcessed = processImage(file, setPreviews, setErrorMessage);

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
      processImage(file, setPreviews, setErrorMessage);
    }

    e.target.value = '';
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const modalTitle = () => {
    if (!previews.length) {
      return 'Add Photo';
    }
    if (activeSection === 'Cropping') {
      return 'Cropping' as string;
    }
    if (activeSection === 'Filters') {
      return 'Filters' as string;
    }
    if (activeSection === 'Publication') {
      return 'Publication' as string;
    }
  };

  return (
    <Modal
      backButton={
        previews.length ? (
          <Button onClick={() => navigateBtn('back')} type={'button'}>
            <ArrowIosBackOutline />
          </Button>
        ) : null
      }
      nextButton={
        previews.length ? (
          <Button onClick={() => navigateBtn('next')} type={'button'}>
            Next
          </Button>
        ) : null
      }
      className={clsx(activeSection !== 'Cropping' && s.card)}
      classNameContent={clsx(previews.length ? s.createPostModal : '')}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      showCloseButton={!previews.length}
      title={modalTitle()}
    >
      {/* todo НЕ ЗАБУДЬ ДОБАВИТЬ Button submit*/}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className={clsx(activeSection === 'Cropping' ? s.boxContent : s.notCropping)}>
          {previews.length ? (
            <>
              {/* todo Добавить в PhotoContainer отображение как карусель если несколько фото */}
              <PhotoContainer
                // addImage={addImgHandler}
                images={previews}
              />
              {/* Cropping panel */}
              {activeSection === 'Cropping' && (
                <div className={s.croppingPanel}>
                  <div>
                    <Button type={'button'}>Ratio</Button>
                    <Button type={'button'}>Scale</Button>
                  </div>
                  {/*todo Диалоговое окно с миниатюрными версиями загруженных картинок, добавить картинку */}
                  <Button type={'button'}>Small-Imgs</Button>
                </div>
              )}
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
          {/* Filters Panel */}
          {activeSection === 'Filters' && (
            <div className={s.filtersPanel}>
              <div>Тут фильтры</div>
            </div>
          )}
          {/* Publication Panel */}
          {activeSection === 'Publication' && (
            <div className={s.publicationPanel}>
              <div>Описание и прочая срань</div>
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};
