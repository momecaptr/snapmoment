import * as React from 'react';

import { GetPostLikesResponse } from '@/shared/api';
import { Typography } from '@/shared/ui';
import Image from 'next/image';

import s from './ShowLikers.module.scss';

type Props = {
  postLikes?: GetPostLikesResponse;
  showViewLikesHandler: () => void;
};

export const ShowLikers = ({ postLikes, showViewLikesHandler }: Props) => {
  const maxLikers = postLikes?.items?.slice(0, 3) || [];

  return (
    <div className={s.root}>
      {postLikes && postLikes.items && postLikes?.totalCount !== 0 && (
        <>
          <div className={s.likes}>
            <button className={s.usersLikes} onClick={showViewLikesHandler}>
              {maxLikers.map((liker, i) => (
                <Image
                  alt={`avatar ${liker.userName}`}
                  height={100}
                  key={liker.id}
                  src={liker?.avatars[i]?.url}
                  width={100}
                />
              ))}
            </button>

            <Typography variant={'regular_text_14'}>
              {postLikes?.totalCount}{' '}
              <Typography as={'span'} variant={'bold_text_14'}>
                &quot;Like&quot;
              </Typography>
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};
