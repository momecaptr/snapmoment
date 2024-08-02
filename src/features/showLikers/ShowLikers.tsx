import * as React from 'react';

import avatarMock from '@/../public/avatar-mock.jpg';
import { GetPostLikesResponse } from '@/shared/api';
import { Typography } from '@/shared/ui';
import Image from 'next/image';

import s from './ShowLikers.module.scss';

type Props = {
  postLikes?: GetPostLikesResponse;
  showViewLikesHandler: () => void;
};

export const ShowLikers = ({ postLikes, showViewLikesHandler }: Props) => {
  return (
    <div className={s.root}>
      {postLikes && postLikes.items && postLikes?.totalCount !== 0 && (
        <div className={s.likes}>
          <button className={s.usersLikes} onClick={showViewLikesHandler}>
            <Image alt={'user avatar'} src={postLikes?.items[0]?.avatars[0]?.url || avatarMock} />
            <Image alt={'user avatar'} src={postLikes?.items[1]?.avatars[0]?.url || avatarMock} />
            <Image alt={'user avatar'} src={postLikes?.items[2]?.avatars[0]?.url || avatarMock} />
          </button>

          <Typography variant={'regular_text_14'}>
            {postLikes?.totalCount}{' '}
            <Typography as={'span'} variant={'bold_text_14'}>
              &quot;Like&quot;
            </Typography>
          </Typography>
        </div>
      )}
    </div>
  );
};
