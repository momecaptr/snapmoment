import { useState } from 'react';

import { Author, Comment } from '@/entities';
import { AddComment, MoreActions, ShowLikers, ToggleLike } from '@/features';
import { ModalKey, useModal } from '@/shared/lib';
import { Modal } from '@/shared/ui';
import { UsersLikesModal } from '@/widget/modal/usersLikesModal/UsersLikesModal';
import { PostInteractionBar } from '@/widget/postInteractionBar/PostInteractionBar';
import Image from 'next/image';

import s from './ViewPostModal.module.scss';

import CloseOutline from '../../../../public/assets/components/CloseOutline';
import avatarMock from '../../../../public/avatar-mock.jpg';

type Props = {
  openViewPhoto: boolean;
  setOpenViewPhoto: (value: boolean) => void;
};

export const ViewPostModal = ({ openViewPhoto, setOpenViewPhoto }: Props) => {
  const [isViewComments, setIsViewComments] = useState(false);
  const handleOnClose = () => {
    setOpenViewPhoto(false);
    setIsViewComments(false);
  };
  const { isOpen, setOpen } = useModal(ModalKey.ViewLikes);

  return (
    <>
      <Modal className={s.modal} onOpenChange={handleOnClose} open={openViewPhoto} title={''}>
        <button className={s.closeBtn} onClick={handleOnClose}>
          <CloseOutline />
        </button>
        <div className={s.container}>
          <div className={s.photo}>
            <Image alt={'avatarMock'} src={avatarMock} />
          </div>

          <UsersLikesModal open={isOpen} setOpen={setOpen} />
          <div className={s.about}>
            <div className={s.authorBlock}>
              <div className={s.authorWrapper}>
                <Author />
                <MoreActions />
              </div>
            </div>
            <div className={s.comments}>
              {/*комменты промапить*/}
              <Comment isViewComments={isViewComments} setIsViewComments={setIsViewComments}>
                <ToggleLike />
              </Comment>
            </div>
            <div className={s.actions}>
              <div className={s.actionsWrapper}>
                <PostInteractionBar />

                <ShowLikers />
              </div>
            </div>
            <AddComment />
          </div>
        </div>
      </Modal>
    </>
  );
};
