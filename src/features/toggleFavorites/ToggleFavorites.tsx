import BookmarkOutline from '@/../public/assets/components/BookmarkOutline';
import { Button } from '@/shared/ui';

import s from './ToggleFavorites.module.scss';

type Props = {};

export const ToggleFavorites = ({}: Props) => {
  return (
    <Button variant={'text'}>
      <BookmarkOutline className={s.bookMarkIcon} />
    </Button>
  );
};
