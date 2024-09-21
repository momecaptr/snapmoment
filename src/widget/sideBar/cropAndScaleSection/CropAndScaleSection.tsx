import React, { ChangeEvent, useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

import ArrowIosBack from '@/../public/assets/components/ArrowIosBack';
import ArrowIosForward from '@/../public/assets/components/ArrowIosForward';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { aspectRatios } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { AspectVals } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScalePanel } from '@/widget/sideBar/cropAndScalePanel/CropAndScalePanel';
import { clsx } from 'clsx';
import { Swiper as SwiperProps } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import s from './CropAndScaleSection.module.scss';

type CropAndScaleSectionType = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CropAndScaleSection = (props: CropAndScaleSectionType) => {
  const { onSelectFile } = props;
  const selectImgInputRef = () => inputRef.current?.click();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  // Для передачи в slider с какой id картинки работаем
  const [currentIndex, setCurrentIndex] = useState(0);

  const onCropChange = ({ crop, id }: { crop: Point; id: string }) => {
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
        backgroundColor: '#333',
        backgroundPosition: 'center'
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

  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperProps | null>(null);

  const handleSwiperInit = (swiper: SwiperProps) => {
    swiperRef.current = swiper;
    updateActiveBullet(swiper);
  };

  const handleSlideChange = (swiper: SwiperProps) => {
    // Передаем id картинки с которой работаем, когда свайпнулись
    setCurrentIndex(swiper.realIndex);
    updateActiveBullet(swiper);
  };

  const updateActiveBullet = (swiper: SwiperProps) => {
    const bullets = document.querySelectorAll(`.${s.swiperPagination} .swiper-pagination-bullet`);

    bullets.forEach((bullet, index) => {
      if (index === swiper.realIndex) {
        bullet.classList.add(s.active);
      } else {
        bullet.classList.remove(s.active);
      }
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.croppingBlock}>
        <Swiper
          navigation={{
            nextEl: `.${s.swiperButtonNext}`,
            prevEl: `.${s.swiperButtonPrev}`
          }}
          pagination={{
            clickable: true,
            el: `.${s.swiperPagination}`
          }}
          allowTouchMove={false}
          className={s.photosSwiper}
          key={allPostImages.length}
          modules={[Navigation, Pagination]}
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiperInit}
          touchStartPreventDefault={false}
        >
          {allPostImages.map((img) => (
            <SwiperSlide key={img.id}>
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
              <CropAndScalePanel
                onAspectChange={({ aspect }) => onAspectChange({ aspect, id: img.id })}
                onZoomChange={({ zoom }) => onZoomChange({ id: img.id, zoom })}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {allPostImages.length > 1 && (
          <>
            <button className={clsx(s.swiperButtonPrev, currentIndex === 0 && s.hidden)} ref={prevRef}>
              <ArrowIosBack />
            </button>
            <button
              className={clsx(s.swiperButtonNext, currentIndex === allPostImages.length - 1 && s.hidden)}
              ref={nextRef}
            >
              <ArrowIosForward />
            </button>
            <div className={s.swiperPagination}></div>
          </>
        )}
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
    </div>
  );
};
