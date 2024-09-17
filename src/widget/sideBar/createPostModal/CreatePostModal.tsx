import React, { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type Crop } from 'react-image-crop';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
import PhotoStub from '@/../public/assets/components/PhotoStub';
import { Button, Modal, Typography } from '@/shared/ui';
import Slider from '@/shared/ui/slider/Slider';
import { modalTitle } from '@/widget/sideBar/lib/modalTitle';
import { navigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
// import { canvasPreview } from './canvasPreview';
import clsx from 'clsx';
import Image from 'next/image';

import s from './CreatePostModal.module.scss';

type PropsCrPostModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export type Sections = 'Cropping' | 'Filters' | 'Publication';

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const [previews, setPreviews] = useState<string[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [activeSection, setActiveSection] = useState<Sections>('Cropping');
  const [aspect, setAspect] = useState<number | undefined>();
  const [scale, setScale] = useState(1);
  const [crop, setCrop] = useState<Crop>();
  const [isRatioDialogOpen, setIsRatioDialogOpen] = useState(false);
  const [isScaleDialogOpen, setIsScaleDialogOpen] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const ratioDialogRef = useRef<HTMLDivElement | null>(null);
  const scaleDialogRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgRefScale = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const availableRatios = [
    { title: 'Custom', value: undefined },
    { title: '1:1', value: 1 / 1 },
    { title: '4:5', value: 4 / 5 },
    { title: '16:9', value: 16 / 9 }
  ];

  // todo КОГДА НАЖИМАЕМ НА SmallImg или Next, нужно сохранять state
  // todo УДАЛИТЬ REACT IMAGE CROP

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent, ref: React.RefObject<HTMLElement>) => {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setIsRatioDialogOpen(false);
  //       setIsScaleDialogOpen(false);
  //     }
  //   };
  //
  //   document.addEventListener('mousedown', (event) => handleClickOutside(event, ratioDialogRef));
  //   document.addEventListener('mousedown', (event) => handleClickOutside(event, scaleDialogRef));
  //
  //   return () => {
  //     document.removeEventListener('mousedown', (event) => handleClickOutside(event, ratioDialogRef));
  //     document.removeEventListener('mousedown', (event) => handleClickOutside(event, scaleDialogRef));
  //   };
  // }, []);

  const navigateBtnHandler = (direction: 'back' | 'next') => {
    navigateBtnLogic({
      activeSection,
      direction,
      setActiveSection,
      setPreviews
    });
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  /* Cropping image logic */

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    /*
     * Эта функция срабатывает при выборе изображения пользователем через инпут.
     * Она использует FileReader, чтобы прочитать выбранное изображение в формате DataURL (который содержит изображение как строку в формате Base64).
     * После загрузки изображения с помощью FileReader, URL изображения добавляется в массив превью (setPreviews), который хранит URL-ы для отображения пользователю. Это позволяет отобразить выбранное изображение в модальном окне.
     * */
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setCrop(undefined); //! Сбрасываем текущие настройки обрезки ЗАЧЕМ???
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';

      setPreviews((prev) => [...prev, imageUrl]);
    });
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      backButton={
        previews.length ? (
          <Button onClick={() => navigateBtnHandler('back')} type={'button'}>
            <ArrowIosBackOutline />
          </Button>
        ) : null
      }
      nextButton={
        previews.length ? (
          <Button onClick={() => navigateBtnHandler('next')} type={'button'}>
            Next
          </Button>
        ) : null
      }
      className={clsx(activeSection !== 'Cropping' && s.card)}
      classNameContent={clsx(previews.length ? s.createPostModal : '')}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      showCloseButton={!previews.length}
      title={modalTitle({ activeSection, previews })}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(activeSection === 'Cropping' ? s.boxContent : s.notCropping)}>
          {previews.length ? (
            <>
              <div className={s.singlePhotoWrapper}>
                {isRatioDialogOpen ? (
                  <>
                    {/*ОБОРАЧИВАЕМ ИЛИ НЕТ???*/}
                    <Image
                      alt={'photo preview'}
                      className={s.singlePhoto}
                      height={400}
                      ref={imgRef}
                      src={previews[0]}
                      width={500}
                    />
                  </>
                ) : (
                  <Image alt={'photo preview'} className={s.singlePhoto} height={400} src={previews[0]} width={500} />
                )}
              </div>

              {activeSection === 'Cropping' && (
                <div className={s.croppingPanel}>
                  <div className={s.ratioAndScale}>
                    <div>
                      {/* {isRatioDialogOpen ? (*/}
                      <div ref={ratioDialogRef}>
                        <Button
                          onClick={() => {
                            console.log('Сохранить обрезку');
                          }}
                          type={'button'}
                        >
                          Save crop
                        </Button>
                        <div className={s.ratioDialog}>
                          {availableRatios.map((ratio) => (
                            <Button
                              className={clsx(s.ratioButton, ratio.value === aspect && s.selected)}
                              key={ratio.title}
                              onClick={() => console.log('Сохранить соотношение сторон')}
                              type={'button'}
                              variant={'outlined'}
                            >
                              {ratio.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {/*) : (*/}
                      {/*  <Button onClick={() => setIsRatioDialogOpen(true)} type={'button'}>*/}
                      {/*    Ratio*/}
                      {/*  </Button>*/}
                      {/*)}*/}
                    </div>
                    <div>
                      {/*{isScaleDialogOpen && (*/}
                      <div ref={scaleDialogRef}>
                        <div className={s.scaleDialog}>
                          <Slider
                            onValueChange={([newValue]) => {
                              setCrop(undefined);
                              setScale(newValue);
                            }}
                            max={2}
                            min={1}
                            step={0.1}
                            value={[scale]}
                          />
                        </div>
                      </div>
                      {/*)}*/}
                      {/*<Button onClick={() => setIsScaleDialogOpen(true)} type={'button'}>*/}
                      {/*  Scale*/}
                      {/*</Button>*/}
                    </div>
                  </div>

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
                  onChange={onSelectFile}
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
          {activeSection === 'Filters' && (
            <div className={s.filtersPanel}>
              <div>Тут фильтры</div>
            </div>
          )}
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

// const handleInputImg = (e: ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//
//   if (file) {
//     const isProcessed = processImage(file, setPreviews, setErrorMessage);
//
//     if (isProcessed) {
//       if (cover?.lastModified === file.lastModified && cover?.name === file.name) {
//         setCover(null);
//       } else {
//         setCover(file);
//       }
//     } else {
//       setCover(null);
//     }
//   }
//   e.target.value = '';
// };
//
// const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//
//   if (file) {
//     processImage(file, setPreviews, setErrorMessage);
//   }
//
//   e.target.value = '';
// };

// // todo ЭТУ УБРАТЬ ПОПРОБОВАТЬ
// const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
//   /*
//    * Эта функция вызывается, когда изображение загружено на страницу.
//    * Она автоматически задаёт обрезку на основе размеров изображения и заданного соотношения сторон (aspect).
//    * Это полезно для предварительной настройки обрезки, когда изображение только загружается.
//    * */
//   if (aspect) {
//     const { height, width } = e.currentTarget;
//
//     setCrop(centerAspectCrop(width, height, aspect));
//   }
// };
