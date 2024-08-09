import { Author } from '@/entities';
import { GetPostLikesResponse } from '@/shared/api/posts/postsTypes';
import { Button, Input, Modal } from '@/shared/ui';

import s from './UsersLikesModal.module.scss';

type Props = {
  open: boolean;
  postLikes?: GetPostLikesResponse;
  setOpen: (value: boolean) => void;
};

export const UsersLikesModal = ({ open, postLikes, setOpen }: Props) => {
  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <Modal className={s.modal} onOpenChange={handleOnClose} open={open} title={'Likes'}>
      <Input className={s.search} placeholder={'Search'} type={'search'} value={''} />

      <div className={s.userLikesList}>
        {postLikes?.items?.map((liker) => (
          <div className={s.userLikes} key={liker.id}>
            <Author name={liker.userName} photo={liker?.avatars[0]?.url} />
            <Button>Follow</Button>
          </div>
        ))}
      </div>
    </Modal>
  );
};
