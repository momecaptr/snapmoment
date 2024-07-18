import { ReSendPost, ToggleFavorites, ToggleLike } from '@/features';

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
