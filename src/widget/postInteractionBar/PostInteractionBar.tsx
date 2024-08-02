import { ReSendPost, ToggleFavorites, ToggleLike } from '@/features';
import { GetPostByIdResponse } from '@/shared/api';

import s from './PostInteractionBar.module.scss';

type Props = {
  postData: GetPostByIdResponse;
};

export const PostInteractionBar = ({ postData }: Props) => {
  return (
    <div className={s.activitesBtn}>
      <div className={s.group}>
        <ToggleLike data={postData} />
        <ReSendPost />
      </div>
      <ToggleFavorites />
    </div>
  );
};
