import React, { ChangeEvent, useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useForm } from 'react-hook-form';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
import PhotoStub from '@/../public/assets/components/PhotoStub';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, Modal, Typography } from '@/shared/ui';
import Slider from '@/shared/ui/slider/Slider';
import { AspectVals } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { modalTitle } from '@/widget/sideBar/lib/modalTitle';
import { useNavigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
// import { canvasPreview } from './canvasPreview';
import clsx from 'clsx';

import s from './CreatePostModal.module.scss';

type PropsCrPostModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export type Sections = 'Cropping' | 'Filters' | 'Publication';

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [activeSection, setActiveSection] = useState<Sections>('Cropping');
  const [isRatioDialogOpen, setIsRatioDialogOpen] = useState(false);
  const [isScaleDialogOpen, setIsScaleDialogOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const ratioDialogRef = useRef<HTMLDivElement | null>(null);
  const scaleDialogRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const aspectRatios = [
    { text: 'Original', value: 1 / 1 },
    { text: '1:1', value: 1 / 1 },
    { text: '4:5', value: 4 / 5 },
    { text: '16:9', value: 16 / 9 }
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

  // const navigateBtnHandler = (direction: 'back' | 'next') => {
  //   navigateBtnLogic({
  //     activeSection,
  //     direction,
  //     setActiveSection,
  //     setPreviews
  //   });
  // };

  const { navigateBtnLogic } = useNavigateBtnLogic({
    activeSection,
    setActiveSection
  });

  const navigateBtnHandler = (direction: 'back' | 'next') => {
    navigateBtnLogic(direction);
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

    const imageUrl = URL.createObjectURL(file); // Создаём URL для файла

    dispatch(createPostActions.addPostImgs({ imageUrl }));

    return () => URL.revokeObjectURL(imageUrl);
  };

  const onCropChange = ({ crop, id }: { crop: Point; id: string }) => {
    console.log({ crop });
    dispatch(createPostActions.updateCrop({ crop, id }));
  };

  const onZoomChange = ({ id, zoom }: { id: string; zoom: number }) => {
    dispatch(createPostActions.updateZoom({ id, zoom }));
  };

  const onAspectChange = ({ aspect, id }: { aspect: AspectVals; id: string }) => {
    if (aspect) {
      dispatch(createPostActions.updateAspect({ aspect, id }));
      if (aspect.text === aspectRatios[0].text) {
        dispatch(createPostActions.updateZoom({ id, zoom: 1 }));
      }
    }
  };

  const onCropComplete = (id: string) => (croppedArea: Area, croppedAreaPixels: Area) => {
    dispatch(
      createPostActions.updateCroppedAreaPixels({
        croppedAreaPx: croppedAreaPixels,
        id
      })
    );
  };

  const customStyles = {
    style: {
      containerStyle: {
        backgroundColor: 'red'
        // backgroundPosition: "center",
      },
      cropAreaStyle: {
        border: 'none'
      }
    }
  };

  return (
    <Modal
      backButton={
        allPostImages.length ? (
          <Button onClick={() => navigateBtnHandler('back')} type={'button'}>
            <ArrowIosBackOutline />
          </Button>
        ) : null
      }
      nextButton={
        allPostImages.length ? (
          <Button onClick={() => navigateBtnHandler('next')} type={'button'}>
            Next
          </Button>
        ) : null
      }
      className={clsx(activeSection !== 'Cropping' && s.card)}
      classNameContent={clsx(allPostImages.length ? s.createPostModal : '')}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      showCloseButton={!allPostImages.length}
      title={modalTitle({ activeSection, allPostImages })}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(activeSection === 'Cropping' ? s.boxContent : s.notCropping)}>
          {allPostImages.length !== 0 ? (
            <>
              {allPostImages.map((img) => (
                <div className={s.singlePhotoWrapper} key={img.id}>
                  <div className={s.singlePhoto}>
                    <Cropper
                      aspect={img.aspect.value}
                      crop={img.crop}
                      image={img.imageUrl}
                      onCropChange={(crop) => onCropChange({ crop, id: img.id })}
                      onCropComplete={onCropComplete(img.id)}
                      onZoomChange={(zoom) => onZoomChange({ id: img.id, zoom })}
                      showGrid={false}
                      zoom={img.zoom}
                      {...customStyles}
                    />
                  </div>

                  {activeSection === 'Cropping' && (
                    <div className={s.croppingPanel}>
                      <div className={s.ratioAndScale}>
                        <div>
                          <Button onClick={() => setIsRatioDialogOpen(!isRatioDialogOpen)} type={'button'}>
                            Ratio
                          </Button>
                          {isRatioDialogOpen && (
                            <div ref={ratioDialogRef}>
                              <div className={s.ratioDialog}>
                                {aspectRatios.map((ratio) => (
                                  <Button
                                    className={clsx(
                                      s.ratioButton,
                                      ratio.value === aspectRatios.find((r) => r.value === ratio.value)?.value &&
                                        s.selected
                                    )}
                                    key={ratio.text}
                                    onClick={() => onAspectChange({ aspect: ratio, id: img.id })}
                                    type={'button'}
                                    variant={'outlined'}
                                  >
                                    {ratio.text}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          {isScaleDialogOpen && (
                            <div ref={scaleDialogRef}>
                              <div className={s.scaleDialog}>
                                <Slider
                                  onValueChange={([newValue]) => {
                                    onZoomChange({ id: img.id, zoom: newValue });
                                  }}
                                  max={3}
                                  min={1}
                                  step={0.1}
                                  value={[scale]}
                                />
                              </div>
                            </div>
                          )}
                          <Button onClick={() => setIsScaleDialogOpen(!isScaleDialogOpen)} type={'button'}>
                            Scale
                          </Button>
                        </div>
                      </div>

                      <Button type={'button'}>Small-Imgs</Button>
                    </div>
                  )}
                </div>
              ))}
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
