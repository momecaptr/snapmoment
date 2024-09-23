import React, { ChangeEvent, useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

import ArrowIosBack from '@/../public/assets/components/ArrowIosBack';
import ArrowIosForward from '@/../public/assets/components/ArrowIosForward';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { AddNewImgPanel } from '@/widget/sideBar/addNewImgPanel/AddNewImgPanel';
import { AspectRatioVals } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScalePanel, aspectRatios } from '@/widget/sideBar/cropAndScalePanel/CropAndScalePanel';
import { clsx } from 'clsx';
import { Swiper as SwiperProps } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import s from './CropAndScaleSection.module.scss';

type CropAndScaleSectionType = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CropAndScaleSection = (props: CropAndScaleSectionType) => {
  const { onSelectFile } = props;
  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  // Для передачи в slider с какой id картинки работаем
  const [currentIndex, setCurrentIndex] = useState(0);

  const onCropChange = ({ crop, id }: { crop: Point; id: string }) => {
    dispatch(createPostActions.setCrop({ crop, id }));
  };

  const onZoomChange = ({ id, zoom }: { id: string; zoom: number }) => {
    dispatch(createPostActions.setZoom({ id, zoom }));
  };

  const onAspectChange = ({ aspect, id }: { aspect: AspectRatioVals; id: string }) => {
    if (aspect) {
      dispatch(createPostActions.setAspect({ aspect, id }));
      if (aspect.text === aspectRatios[0].text) {
        dispatch(createPostActions.setZoom({ id, zoom: 1 }));
        dispatch(createPostActions.setCrop({ crop: { x: 0, y: 0 }, id }));
      }
    }
  };

  const onCropComplete = (id: string) => (croppedArea: Area, croppedAreaPixels: Area) => {
    dispatch(
      createPostActions.setCroppedAreaPixels({
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
        objectFit: 'cover'
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

  // Функция для переключения на слайд по индексу
  const handleSelectImageSwiper = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.croppingBlock}>
        <Swiper
          navigation={{
            nextEl: `.${s.swiperButtonNext}`,
            prevEl: `.${s.swiperButtonPrev}`
          }}
          allowTouchMove={false}
          className={s.photosSwiper}
          key={allPostImages.length}
          modules={[Navigation]}
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiperInit}
          touchStartPreventDefault={false}
        >
          {allPostImages.map((img) => (
            <SwiperSlide key={img.id}>
              <div className={s.cropperElement}>
                {/* ! ЭТО СПЕЦИАЛЬНО, из-за objectFit (не понятно почему подчеркивает красным, но все работает). Можно заменить на 'object-fit', тогда в консоли ошибка */}
                {/* @ts-ignore */}
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
                id={img.id}
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
          </>
        )}
      </div>
      <div className={s.addImg}>
        <AddNewImgPanel
          onSelectFile={onSelectFile}
          onSelectImageSwiper={handleSelectImageSwiper}
          swiperIndex={swiperRef.current?.realIndex}
        />
      </div>
    </div>
  );
};
