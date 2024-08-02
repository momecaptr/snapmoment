import * as React from 'react';

import CloseOutline from '@/../public/assets/components/CloseOutline';
import { Author, Comment } from '@/entities';
import { AddComment, MoreActions, ShowLikers } from '@/features';
import { TimeAgo } from '@/features/timeAgo/TimeAgo';
import { GetPostLikesResponse } from '@/shared/api';
import { GetPostByIdResponse, GetPostCommentsByPostIdResponse } from '@/shared/api/public/publicTypes';
import { ModalKey, useModal } from '@/shared/lib';
import { Modal, PhotosSwiper } from '@/shared/ui';
import { PostInteractionBar, UsersLikesModal } from '@/widget';

import s from './ViewPostModal.module.scss';

type Props = {
  isAuth: boolean;
  isFetching?: boolean;
  openViewPhoto: boolean;
  postComments?: GetPostCommentsByPostIdResponse;
  postData?: GetPostByIdResponse;
  postLikes?: GetPostLikesResponse;
  setOpenViewPhoto: (value: boolean) => void;
};

export const ViewPostModal = ({
  isAuth,
  isFetching = false,
  openViewPhoto,
  postComments,
  postData,
  postLikes,
  setOpenViewPhoto
}: Props) => {
  const { isOpen, setOpen } = useModal(ModalKey.ViewLikes);

  const showViewLikesHandler = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpenViewPhoto(false);
  };

  return (
    postData && (
      <>
        <UsersLikesModal open={isOpen} postLikes={postLikes} setOpen={setOpen} />

        <Modal className={s.modal} onOpenChange={handleOnClose} open={openViewPhoto} title={''}>
          <button className={s.closeBtn} onClick={handleOnClose}>
            <CloseOutline className={s.closeIcon} />
          </button>

          <div className={s.container}>
            <div className={s.photos}>{!isFetching && <PhotosSwiper sliders={postData.images} />}</div>

            <div className={s.about}>
              <div className={s.authorBlock}>
                <div className={s.authorWrapper}>
                  {!isFetching && (
                    <>
                      <Author name={postData.userName} photo={postData.avatarOwner} />
                      {isAuth && <MoreActions />}
                    </>
                  )}
                </div>
              </div>

              <div className={s.comments}>
                {!isFetching &&
                  postComments?.items?.map((comment) => (
                    <Comment comment={comment} isAuth={isAuth} key={comment.id}>
                      {/*{isAuth && <ToggleLike />}*/}
                    </Comment>
                  ))}
              </div>

              <div className={s.actions}>
                <div className={s.actionsWrapper}>
                  {isAuth && <PostInteractionBar postData={postData} />}
                  {!isFetching && (
                    <>
                      <ShowLikers postLikes={postLikes} showViewLikesHandler={showViewLikesHandler} />
                      <TimeAgo time={postData.createdAt} />
                    </>
                  )}
                </div>
              </div>

              {isAuth && <AddComment />}
            </div>
          </div>
        </Modal>
      </>
    )
  );
};
