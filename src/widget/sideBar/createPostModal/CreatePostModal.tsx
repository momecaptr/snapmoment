import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactCrop, {
  type Crop,
  centerCrop,
  // convertToPixelCrop,
  makeAspectCrop
} from 'react-image-crop';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
import PhotoStub from '@/../public/assets/components/PhotoStub';
import { Button, Modal, Typography } from '@/shared/ui';
import { modalTitle } from '@/widget/sideBar/lib/modalTitle';
import { navigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { processImage } from '@/widget/sideBar/lib/processImage';
import { saveCroppedImageLocally } from '@/widget/sideBar/lib/saveCroppedImageLocally';
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
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [scale, setScale] = useState(1);
  const [crop, setCrop] = useState<Crop>();
  const [isRatioDialogOpen, setIsRatioDialogOpen] = useState(false);
  const [isScaleDialogOpen, setIsScaleDialogOpen] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const ratioDialogRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ratioDialogRef.current && !ratioDialogRef.current.contains(event.target as Node)) {
        // Закрыть диалог, если клик произошел вне него
        setIsRatioDialogOpen(false);
      }
    };

    if (isRatioDialogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Чистим слушатель, когда компонент размонтируется или состояние изменится
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRatioDialogOpen]);

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

  /* Cropping image logic */

  const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
    /*
     * Эта функция создаёт обрезку изображения по заданному аспектному соотношению, чтобы изображение было отцентрировано.
     * Использует makeAspectCrop для создания обрезки с определённым соотношением сторон и центрирует её с помощью centerCrop.
     * Она нужна для автоматической установки обрезки при загрузке изображения.
     * */
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%', // Единицы измерения - проценты
          width: 90 // Ширина обрезки - 90% от ширины изображения
        },
        aspect, // Соотношение сторон возьмем из state
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

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

  // todo ЭТУ УБРАТЬ ПОПРОБОВАТЬ
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    /*
     * Эта функция вызывается, когда изображение загружено на страницу.
     * Она автоматически задаёт обрезку на основе размеров изображения и заданного соотношения сторон (aspect).
     * Это полезно для предварительной настройки обрезки, когда изображение только загружается.
     * */
    if (aspect) {
      const { height, width } = e.currentTarget;

      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const saveCroppedToStateHandler = () => {
    saveCroppedImageLocally({ canvasRef, completedCrop, imgRef, setPreviews });
  };

  const handleAspectChange = (newAspect?: number) => {
    /*
     * Эта функция изменяет соотношение сторон для обрезки изображения.
     * Когда вызывается функция, она устанавливает новое соотношение сторон (например, 1:1 или 16:9), пересчитывает обрезку с новым аспектом и обновляет состояние crop и completedCrop.
     * Это полезно, когда пользователь хочет изменить соотношение сторон для изображения.
     * */
    setAspect(newAspect);

    if (imgRef.current) {
      const { height, width } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, newAspect || width / height);

      setCrop(newCrop);
      setCompletedCrop(newCrop);
    }
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
                    <ReactCrop
                      aspect={aspect}
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <Image
                        alt={'photo preview'}
                        className={s.singlePhoto}
                        height={400}
                        // onLoad={onImageLoad}
                        ref={imgRef}
                        src={previews[0]}
                        style={{ objectFit: 'cover', transform: `scale(${scale})` }}
                        width={500}
                      />
                    </ReactCrop>
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                  </>
                ) : (
                  <Image alt={'photo preview'} className={s.singlePhoto} height={400} src={previews[0]} width={500} />
                )}
              </div>

              {activeSection === 'Cropping' && (
                <div className={s.croppingPanel}>
                  <div className={s.ratioAndScale}>
                    {isRatioDialogOpen ? (
                      <div ref={ratioDialogRef}>
                        <Button onClick={saveCroppedToStateHandler} type={'button'}>
                          Save crop
                        </Button>
                        <div className={s.ratioDialog}>
                          <Button onClick={() => handleAspectChange()} type={'button'} variant={'outlined'}>
                            Original
                          </Button>
                          <Button onClick={() => handleAspectChange(1 / 1)} type={'button'} variant={'outlined'}>
                            1:1
                          </Button>
                          <Button onClick={() => handleAspectChange(4 / 5)} type={'button'} variant={'outlined'}>
                            4:5
                          </Button>
                          <Button onClick={() => handleAspectChange(16 / 9)} type={'button'} variant={'outlined'}>
                            16:9
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => setIsRatioDialogOpen(true)} type={'button'}>
                        Ratio
                      </Button>
                    )}
                    <Button type={'button'}>Scale</Button>
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
