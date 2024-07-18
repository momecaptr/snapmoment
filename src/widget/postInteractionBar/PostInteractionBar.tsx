import { ReSendPost } from '@/features';
import { ToggleFavorites } from '@/features/toggleFavorites/ToggleFavorites';
import { ToggleLike } from '@/features/toggleLike/ToggleLike';

import s from './PostInteractionBar.module.scss';

type Props = {};

export const PostInteractionBar = ({}: Props) => {
  return (
    <div className={s.activitesBtn}>
      <div className={s.group}>
        <ToggleLike />
        <ReSendPost />
      </div>
      <ToggleFavorites />
    </div>
  );
};
