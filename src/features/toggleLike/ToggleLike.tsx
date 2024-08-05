import Heart from '@/../public/assets/components/Heart';
import HeartOutline from '@/../public/assets/components/HeartOutline';
import { Button } from '@/shared/ui';

import s from './ToggleLike.module.scss';

type Props = {
  isMyLike: boolean;
  updateLikeStatus: () => void;
};

export const ToggleLike = ({ isMyLike, updateLikeStatus }: Props) => {
  return (
    <Button className={s.likeBtn} onClick={updateLikeStatus} variant={'text'}>
      {isMyLike ? <Heart className={s.heartIcon} /> : <HeartOutline />}
    </Button>
  );
};
