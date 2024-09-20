import React, { ChangeEvent, useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useForm } from 'react-hook-form';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, Modal } from '@/shared/ui';
import { AspectVals } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScalePost } from '@/widget/sideBar/cropAndScalePost/CropAndScalePost';
import { modalTitle } from '@/widget/sideBar/lib/modalTitle';
import { useNavigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
import { NoImagesPost } from '@/widget/sideBar/noImagesPost/NoImagesPost';
// import { canvasPreview } from './canvasPreview';
import clsx from 'clsx';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import s from './CreatePostModal.module.scss';

type PropsCrPostModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export type Sections = 'Cropping' | 'Filters' | 'Publication';

export const aspectRatios = [
  { text: 'Original', value: 1 / 1 },
  { text: '1:1', value: 1 / 1 },
  { text: '4:5', value: 4 / 5 },
  { text: '16:9', value: 16 / 9 }
];

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [activeSection, setActiveSection] = useState<Sections>('Cropping');
  const selectImgInputRef = () => inputRef.current?.click();
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
    const file = e.target.files?.[0];
    const acceptedTypes = ['image/jpeg', 'image/png'];
    const maxSizeBytes = 20 * 1024 * 1024; // 20 MB Max

    if (!file) {
      return;
    }

    if (!acceptedTypes.includes(file.type)) {
      setErrorMessage('Wrong file type');

      return;
    }

    if (file.size > maxSizeBytes) {
      setErrorMessage('Max file size should be less than 20 MB');

      return;
    }

    const imageUrl = URL.createObjectURL(file);

    dispatch(createPostActions.addPostImgs({ imageUrl }));

    if (inputRef.current) {
      inputRef.current.value = '';
    }

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
        dispatch(createPostActions.updateCrop({ crop: { x: 0, y: 0 }, id }));
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

  const cropperExtraStyles = {
    style: {
      containerStyle: {
        backgroundColor: '#333'
      },
      cropAreaStyle: {
        border: 'none'
      },
      mediaStyle: {
        height: '100%',
        'object-fit': 'contain'
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
      classNameContent={s.createPostModal}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      showCloseButton={!allPostImages.length}
      title={modalTitle({ activeSection, allPostImages })}
    >
      <div className={clsx(s.boxContent, activeSection === 'Cropping' ? s.fullWidth : s.splitContent)}>
        {allPostImages.length !== 0 ? (
          <>
            <div className={clsx(s.block, activeSection === 'Cropping' ? s.croppingBlock : s.notCroppingBlock)}>
              <Swiper
                style={{
                  height: '500px',
                  position: 'relative'
                }}
                allowTouchMove={false}
                className={'post-images-slider'}
                key={allPostImages.length}
                modules={[Navigation, Pagination]}
                noSwiping={false}
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={10}
                touchStartPreventDefault={false}
                navigation
              >
                {allPostImages.map((img) => (
                  <SwiperSlide className={s.swiper} key={img.id}>
                    <div className={s.imageWrapper}>
                      {activeSection === 'Cropping' ? (
                        <div className={s.cropperElement}>
                          <Cropper
                            aspect={img.aspect.value}
                            crop={img.crop}
                            image={img.imageUrl}
                            onCropChange={(crop) => onCropChange({ crop, id: img.id })}
                            onCropComplete={onCropComplete(img.id)}
                            onZoomChange={(zoom) => onZoomChange({ id: img.id, zoom })}
                            showGrid={false}
                            zoom={img.zoom}
                            {...cropperExtraStyles}
                          />
                        </div>
                      ) : (
                        <div className={s.imageSubWrapper}>
                          <Image
                            alt={'Post'}
                            className={s.imageElement}
                            height={500}
                            src={img.imageUrl || ''}
                            width={500}
                          />
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
                {activeSection === 'Cropping' && (
                  <CropAndScalePost
                    onAspectChange={onAspectChange}
                    onSelectFile={onSelectFile}
                    onZoomChange={onZoomChange}
                  />
                )}
              </Swiper>
            </div>
            <Button className={s.addImg} onClick={selectImgInputRef} type={'button'}>
              AddImg
              <input
                accept={'image/jpeg, image/png'}
                id={'fileInput'}
                name={'file'}
                onChange={onSelectFile}
                ref={inputRef}
                style={{ display: 'none' }}
                type={'file'}
              />
            </Button>
            {activeSection !== 'Cropping' && (
              <div className={clsx(s.rightContent, activeSection === 'Filters' ? s.filtersPanel : s.publicationPanel)}>
                {activeSection === 'Filters' && <div>Тут фильтры</div>}
                {activeSection === 'Publication' && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>Описание и прочая срань</div>
                  </form>
                )}
              </div>
            )}
          </>
        ) : (
          <NoImagesPost onSelectFile={(e) => onSelectFile(e)} />
        )}
      </div>
    </Modal>
  );
};
