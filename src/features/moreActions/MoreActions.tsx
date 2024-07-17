import MoreHorizontalOutline from '@/../public/assets/components/MoreHorizontalOutline';
import { Button } from '@/shared/ui';

import s from './MoreActions.module.scss';
type Props = {};

export const MoreActions = ({}: Props) => {
  return (
    <Button className={s.btn} variant={'text'}>
      <MoreHorizontalOutline className={s.moreIcon} />
    </Button>
  );
};
