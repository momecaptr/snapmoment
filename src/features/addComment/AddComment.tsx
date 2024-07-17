import { Button, Input } from '@/shared/ui';

import s from './AddComment.module.scss';

type Props = {};

export const AddComment = ({}: Props) => {
  return (
    <div className={s.createComment}>
      <Input className={s.text} placeholder={'Add a Comment...'} type={'text'} />
      <Button className={s.publishBtn} variant={'text'}>
        Publish
      </Button>
    </div>
  );
};
