import * as React from 'react';
import { useRef, useState } from 'react';

import ArrowIosBack from '@/../public/assets/components/ArrowIosBack';
import ArrowIosForward from '@/../public/assets/components/ArrowIosForward';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Swiper as SwiperProps } from 'swiper';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line import/extensions
import 'swiper/scss';
// eslint-disable-next-line import/extensions
import 'swiper/scss/pagination';

import s from './PhotosSwiper.module.scss';

// Ниже экстенд от этого типа, что гарантирует, что передаваемый массив объектов будет принят без ошибок, если в нем есть свойство url
type HasUrl = { url: null | string | undefined };

type Props<T extends HasUrl> = {
  className?: string;
  classNameImage?: string;
  classNameSwiperSlide?: string;
  getIndex?: (val: number) => void;
  isModal?: boolean; // Новый пропс для модального или не модального режима. По умолчанию сделаем true, а там где кучей рендерим - там будем ставить в false
  isSwiperComplexRef?: boolean; // Флаг для определения какой ref будет для slider
  mockImg?: string;
  sliders: T[];
  styles?: string;
};

/**
 * Компонент `PhotosSwiper` — карусель изображений с поддержкой навигации и пагинации.
 * Тут магическое свойство isSwiperComplexRef -- если передадим true, то для серверного рендера ref будет считаться через Math, а не по url.
 * Если isSwiperComplexRef = false, то ref будет определяться по url картинок в посте.
 * Я не знаю почему, но если ref для Swiper определяется только по url (довольно уникально), то возникают проблемы отображения буллетов в swiperPagination (точки внизу свайпера, которые определяют на какой фотке сейчас находимся)
 * Поэтому решено через вот этот флаг. И так работает.
 * @template T - Тип, который расширяет интерфейс `HasUrl`. HasUrl - тип с параметром url: string. Короче, принимает массив любых объектов, но обязательно должен быть url
 * @param {string} className - Дополнительные классы для стилизации контейнера карусели.
 * @param {string} classNameImage - Дополнительные классы для стилизации изображений.
 * @param {string} classNameSwiperSlide - Дополнительные классы для стилизации слайдов карусели.
 * @param {function} getIndex - Функция, возвращает индекс текущего активного слайда.
 * @param {T[]} sliders - Массив объектов с изображениями, содержащими URL. Короче, принимает массив любых объектов, но обязательно должен быть url
 * @param {string} styles - Стиль фильтра, применяемый к изображению. ИНЛАЙНОВЫЙ
 * @param {string} mockImg - URL мокового изображения, если не будет фотографий в массиве sliders
 * @param {boolean} isSwiperComplexRef - Флаг для определения какой ref будет для slider (true => считается по Math, false => считается по url)
 */
export const PhotosSwiper = <T extends HasUrl>({
  className,
  classNameImage,
  classNameSwiperSlide,
  getIndex,
  isSwiperComplexRef = false,
  mockImg,
  sliders,
  styles
}: Props<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperProps | null>(null);

  // // Уникальный идентификатор для `data-` атрибутов
  const mathRef = useRef(`swiper-${Math.random().toString(36).substr(2, 9)}`);

  // Используем стабильный ID, который будет одинаковым на сервере и клиенте.
  const refThroughUrl = useRef(`swiper-${sliders.map((slider) => slider.url).join('-')}`);

  const uniqueId = isSwiperComplexRef ? refThroughUrl : mathRef;

  const handleSwiperInit = (swiper: SwiperProps) => {
    swiperRef.current = swiper;
  };

  const handleSlideChange = (swiper: SwiperProps) => {
    setCurrentIndex(swiper.realIndex);
    if (getIndex) {
      getIndex(swiper.realIndex);
    }
  };

  // Останавливаем распространение события при клике на кнопку (это чтобы модалка не открывалась, а просто клики next prev работали)
  const handleNavigationClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем распространение события
  };

  // Используем `mockImg`, если нет фотографий
  const photos = sliders.length ? sliders : [{ url: mockImg }];

  return (
    <div className={clsx(s.container, className)}>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Keyboard,
          ...(sliders.length > 1 ? [Mousewheel] : []) // добавляем Mousewheel только если условие выполнено
        ]}
        navigation={{
          // Через data-атрибуты, чтобы был уникальный идентификатор для стилей, иначе при клике на кнопку next или prev,
          // будут слайдится не только эти фотки, но и фотки других постов с таким же стилем
          nextEl: `[data-next="${uniqueId.current}"]`,
          prevEl: `[data-prev="${uniqueId.current}"]`
        }}
        pagination={{
          bulletActiveClass: s.paginationBulletActive,
          bulletClass: s.paginationBullet,
          clickable: true,
          el: `[data-pagination="${uniqueId.current}"]`
        }}
        className={s.photosSwiper}
        mousewheel={sliders.length > 1} // также передаем условие для включения mousewheel
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInit}
        keyboard
      >
        {photos.map((photo, i) => (
          <SwiperSlide className={clsx(s.swiperSlide, classNameSwiperSlide)} key={photo.url || i}>
            <Image
              alt={`post photo ${i}`}
              className={classNameImage}
              height={100}
              src={photo.url || ''}
              style={styles ? { filter: styles } : {}}
              width={100}
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {photos.length > 1 && (
        <>
          <button
            className={clsx(s.swiperButtonPrev, currentIndex === 0 && s.hidden)}
            data-prev={uniqueId.current}
            onClick={handleNavigationClick}
            type={'button'}
          >
            <ArrowIosBack />
          </button>
          <button
            className={clsx(s.swiperButtonNext, currentIndex === photos.length - 1 && s.hidden)}
            data-next={uniqueId.current}
            onClick={handleNavigationClick}
            type={'button'}
          >
            <ArrowIosForward />
          </button>
          <div className={s.swiperPagination} data-pagination={uniqueId.current}></div>
        </>
      )}
    </div>
  );
};
