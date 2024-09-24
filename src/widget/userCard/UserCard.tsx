import * as React from 'react';
import { useState } from 'react';

import Block from '@/../public/assets/components/Block';
import avatarMock from '@/../public/avatar-mock.jpg';
import { Author } from '@/entities';
import { TimeAgo, ToggleDescription } from '@/features';
import { Item } from '@/shared/api/public/publicTypes';
import { Button, Typography } from '@/shared/ui';
import { clsx } from 'clsx';
import Image from 'next/image';

import s from './UserCard.module.scss';

type Props = {
  post: Item;
  showPostModalHandler: (isOpen: boolean, postId?: number) => void;
};

export const UserCard = ({ post, showPostModalHandler }: Props) => {
  const [isShowText, setIsShowText] = useState(false);

  const toggleShowText = () => setIsShowText(!isShowText);

  return (
    <div className={s.card}>
      <div className={s.photo} onClick={() => showPostModalHandler(true, post.id)}>
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
          isLength={post.description.length > 100}
          isShowText={isShowText}
          toggleShowText={toggleShowText}
        />
      </div>
    </div>
  );
};
