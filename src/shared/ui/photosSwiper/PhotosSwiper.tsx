import * as React from 'react';
import { useRef } from 'react';

import ArrowIosBack from '@/../public/assets/components/ArrowIosBack';
import ArrowIosForward from '@/../public/assets/components/ArrowIosForward';
import avatarMock from '@/../public/avatar-mock.jpg';
import { GetPostsCommentArgsImages } from '@/shared/api/public/publicTypes';
import Image from 'next/image';
import { Swiper as SwiperProps } from 'swiper';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line import/extensions
import 'swiper/scss';
// eslint-disable-next-line import/extensions
import 'swiper/scss/pagination';

import s from './PhotosSwiper.module.scss';

type Props = {
  sliders: GetPostsCommentArgsImages[];
};

export const PhotosSwiper: React.FC<Props> = ({ sliders }) => {
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperProps | null>(null);

  const handleSwiperInit = (swiper: SwiperProps) => {
    swiperRef.current = swiper;
    updateActiveBullet(swiper);
  };

  const handleSlideChange = (swiper: SwiperProps) => {
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
    <div className={s.container}>
      <Swiper
        navigation={{
          nextEl: `.${s.swiperButtonNext}`,
          prevEl: `.${s.swiperButtonPrev}`
        }}
        pagination={{
          clickable: true,
          el: `.${s.swiperPagination}`
        }}
        className={s.photosSwiper}
        modules={[Navigation, Pagination, Keyboard, Mousewheel]}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInit}
        keyboard
        mousewheel
      >
        {sliders.length > 1 ? (
          sliders.map((photo, i) => (
            <SwiperSlide className={s.swiperSlide} key={i}>
              <Image alt={`post photo ${i}`} height={100} src={photo.url} width={100} unoptimized />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className={s.swiperSlide}>
            <Image alt={'post photo'} height={100} src={sliders[0]?.url || avatarMock} width={100} unoptimized />
          </SwiperSlide>
        )}
      </Swiper>
      {sliders.length > 1 && (
        <>
          <button className={s.swiperButtonPrev} ref={prevRef}>
            <ArrowIosBack />
          </button>
          <button className={s.swiperButtonNext} ref={nextRef}>
            <ArrowIosForward />
          </button>
          <div className={s.swiperPagination}></div>
        </>
      )}
    </div>
  );
};
