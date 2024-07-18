import PaperPlaneOutline from '@/../public/assets/components/PaperPlaneOutline';
import { Button } from '@/shared/ui';

import s from './ReSendPost.module.scss';

type Props = {};

export const ReSendPost = ({}: Props) => {
  return (
    <Button variant={'text'}>
      <PaperPlaneOutline className={s.planeIcon} />
    </Button>
  );
};
