import HeartOutline from '@/../public/assets/components/HeartOutline';
import { Button } from '@/shared/ui';

import s from './ToggleLike.module.scss';

type Props = {};

export const ToggleLike = ({}: Props) => {
  return (
    <Button className={s.likeBtn} variant={'text'}>
      <HeartOutline />
    </Button>
  );
};
