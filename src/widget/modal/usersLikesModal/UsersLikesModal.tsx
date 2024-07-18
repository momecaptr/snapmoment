import { Author } from '@/entities/author/Author';
import { Button, Input, Modal } from '@/shared/ui';

import s from './UsersLikesModal.module.scss';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const UsersLikesModal = ({ open, setOpen }: Props) => {
  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal className={s.modal} onOpenChange={handleOnClose} open={open} title={'Likes'}>
        <Input className={s.search} placeholder={'Search'} type={'search'} value={''} />
        {/*промапить*/}
        <div className={s.userLikesList}>
          <div className={s.userLikes}>
            <Author />
            <Button>Follow</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
