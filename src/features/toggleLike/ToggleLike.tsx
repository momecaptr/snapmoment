import { useState } from 'react';

import Heart from '@/../public/assets/components/Heart';
import HeartOutline from '@/../public/assets/components/HeartOutline';
import { GetPostByIdResponse, useUpdateLikePostMutation } from '@/shared/api';
import { Button } from '@/shared/ui';

import s from './ToggleLike.module.scss';

type Props = {
  data: GetPostByIdResponse;
};
enum LikeStatus {
  DISLIKE = 'DISLIKE',
  LIKE = 'LIKE',
  NONE = 'NONE'
}

export const ToggleLike = ({ data }: Props) => {
  const [likeStatus, setLikeStatus] = useState<boolean>(data?.isLiked);
  const [updateLikePost] = useUpdateLikePostMutation();

  const updateLikePostHandler = async () => {
    const newLikeStatus = !likeStatus;

    setLikeStatus(newLikeStatus);

    await updateLikePost({
      likeStatus: newLikeStatus ? LikeStatus.LIKE : LikeStatus.NONE,
      postId: data?.id
    });
  };

  return (
    <Button className={s.likeBtn} onClick={updateLikePostHandler} variant={'text'}>
      {likeStatus ? <Heart className={s.heartIcon} /> : <HeartOutline />}
    </Button>
  );
};
