import * as React from 'react';
import { useState } from 'react';

import Block from '@/../public/assets/components/Block';
import mockImg from '@/../public/epicpen_6ymMwEsBEI.png';
import { Author } from '@/entities';
import { TimeAgo, ToggleDescription } from '@/features';
import { Item } from '@/shared/api/public/publicTypes';
import { Button, PhotosSwiper, Typography } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './UserCard.module.scss';

type Props = {
  isSwiperComplexRef?: boolean;
  post: Item;
  showPostModalHandler: (isOpen: boolean, postId?: number) => void;
};

/**
 * Тут магическое свойство isSwiperComplexRef -- если передадим true, то для серверного рендера ref будет считаться через Math, а не по url.
 * Если isSwiperComplexRef = false, то ref будет определяться по url картинок в посте.
 * Я не знаю почему, но если ref для Swiper определяется только по url (довольно уникально), то возникают проблемы отображения буллетов в swiperPagination (точки внизу свайпера, которые определяют на какой фотке сейчас находимся)
 * Поэтому решено через вот этот флаг. И так работает.
 * @param isSwiperComplexRef -- определяем как будет вычисляться ref для каждого слайдера постов (потому что этот компонент в рендере постов тоже участвует. НЕ ТОЛЬКО В МОДАЛКАХ)
 * @param post
 * @param showPostModalHandler
 * @constructor
 */
export const UserCard = ({ isSwiperComplexRef, post, showPostModalHandler }: Props) => {
  const [isShowText, setIsShowText] = useState(false);

  const toggleShowText = () => setIsShowText(!isShowText);

  const lastIndex = post.images.length - 1;

  return (
    <div className={s.card}>
      <div className={s.photo} onClick={() => showPostModalHandler(true, post.id)}>
        <PhotosSwiper isSwiperComplexRef={isSwiperComplexRef} mockImg={mockImg.src} sliders={post.images} />
      </div>

      <div className={clsx(s.content, isShowText && s.expanded)}>
        <div className={s.authorContainer}>
          <Author name={post.userName} photo={post.avatarOwner} />

          {isShowText && (
            <Button className={s.blockBtn} onClick={toggleShowText}>
              <Block className={s.blockIcon} />
            </Button>
          )}
        </div>

        <TimeAgo time={post.createdAt} />

        <Typography as={'p'} className={clsx(s.description, isShowText && s.expanded)} variant={'regular_text_14'}>
          {post.description}
        </Typography>

        <ToggleDescription
          isLength={post.description.length > 100}
          isShowText={isShowText}
          toggleShowText={toggleShowText}
        />
      </div>
    </div>
  );
};
