import { useState } from 'react';
import * as React from 'react';

import Block from '@/../public/assets/components/Block';
import avatarMock from '@/../public/avatar-mock.jpg';
import { Author } from '@/entities';
import { ToggleDescription } from '@/features';
import { TimeAgo } from '@/features/timeAgo/TimeAgo';
import { Item } from '@/shared/api/public/publicTypes';
import { Button, Typography } from '@/shared/ui';
import { clsx } from 'clsx';
import Image from 'next/image';

import s from './UserCard.module.scss';

type Props = {
  lazyOpenModalHandler: (userId: number, isOpen: boolean) => void;
  post: Item;
};

export const UserCard = ({ lazyOpenModalHandler, post }: Props) => {
  const [isShowText, setIsShowText] = useState(false);

  const showViewPhotoHandler = () => {
    lazyOpenModalHandler(post.id, true);
  };

  const toggleShowText = () => setIsShowText(!isShowText);

  return (
    <div className={s.card}>
      <div className={s.photo} onClick={showViewPhotoHandler}>
        <Image alt={'post photos'} height={100} src={post.images[0]?.url || avatarMock} width={100} unoptimized />
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
          isLength={post.description.length > 20}
          isShowText={isShowText}
          toggleShowText={toggleShowText}
        />
      </div>
    </div>
  );
};
