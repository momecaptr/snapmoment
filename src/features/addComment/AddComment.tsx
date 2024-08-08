import { Input, Typography } from '@/shared/ui';

import s from './AddComment.module.scss';

type Props = {};

export const AddComment = ({}: Props) => {
  return (
    <div className={s.createComment}>
      <Input className={s.text} placeholder={'Add a Comment...'} type={'text'} />

      <Typography as={'button'} className={s.publishBtn} variant={'h3'}>
        Publish
      </Typography>
    </div>
  );
};
