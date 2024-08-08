import { ReSendPost, ToggleFavorites, ToggleLike } from '@/features';
import { GetPostByIdResponse, GetPostLikesResponse, useMeQuery, useUpdateLikePostMutation } from '@/shared/api';
import { LikeStatus } from '@/shared/lib';

import s from './PostInteractionBar.module.scss';

type Props = {
  postData: GetPostByIdResponse;
  postLikes?: GetPostLikesResponse;
};

export const PostInteractionBar = ({ postData, postLikes }: Props) => {
  const { data: me } = useMeQuery();
  const [updateLikePost] = useUpdateLikePostMutation();

  const isMyLike = !!postLikes?.items?.find((item) => item.userId === me?.userId);

  const updateLikeStatusHandler = async () => {
    await updateLikePost({
      likeStatus: isMyLike ? LikeStatus.NONE : LikeStatus.LIKE,
      postId: postData?.id
    });
  };

  return (
    <div className={s.activitesBtn}>
      <div className={s.group}>
        <ToggleLike isMyLike={isMyLike} updateLikeStatus={updateLikeStatusHandler} />
        <ReSendPost />
      </div>
      <ToggleFavorites />
    </div>
  );
};
