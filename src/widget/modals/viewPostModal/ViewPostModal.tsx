import * as React from 'react';

import CloseOutline from '@/../public/assets/components/CloseOutline';
import { Author, Comment } from '@/entities';
import { AddComment, MoreActions, ShowLikers, TimeAgo } from '@/features';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { GetPostLikesResponse } from '@/shared/api/posts/postsTypes';
import { GetPostByIdResponse, GetPostCommentsByPostIdResponse } from '@/shared/api/public/publicTypes';
import { ModalKey, useModal } from '@/shared/lib';
import { Modal, PhotosSwiper } from '@/shared/ui';
import { PostInteractionBar, UsersLikesModal } from '@/widget';
import { useRouter } from 'next/router';

import s from '@/widget/modals/viewPostModal/ViewPostModal.module.scss';

type Props = {
  postComments: GetPostCommentsByPostIdResponse;
  postData: GetPostByIdResponse;
  postLikes: GetPostLikesResponse;
};

export const ViewPostModal = ({ postComments, postData, postLikes }: Props) => {
  const { isOpen, setOpen } = useModal(ModalKey.ViewLikes);
  const { data: me } = useMeQuery();

  const router = useRouter();
  const isAuth = !!me?.userId;

  const showViewLikesHandler = () => {
    setOpen(true);
  };

  const setCloseModalHandler = () => {
    router.back();
  };

  return (
    <>
      {isOpen && <UsersLikesModal postLikes={postLikes} setOpen={setOpen} open />}

      <Modal className={s.modal} onOpenChange={setCloseModalHandler} title={''} open>
        <button className={s.closeBtn} onClick={setCloseModalHandler}>
          <CloseOutline className={s.closeIcon} />
        </button>

        <div className={s.container}>
          <div className={s.photos}>{<PhotosSwiper sliders={postData.images} />}</div>

          <div className={s.about}>
            <div className={s.authorBlock}>
              <div className={s.authorWrapper}>
                <Author name={postData.userName} photo={postData.avatarOwner} />
                {isAuth && <MoreActions />}
              </div>
            </div>

            <div className={s.comments}>
              {postComments?.items?.map((comment) => (
                <Comment comment={comment} isAuth={isAuth} key={comment.id}>
                  {/*{isAuth && <ToggleLike />}*/}
                </Comment>
              ))}
            </div>

            <div className={s.actions}>
              <div className={s.actionsWrapper}>
                {isAuth && <PostInteractionBar postData={postData} postLikes={postLikes} />}

                <ShowLikers postLikes={postLikes} showViewLikesHandler={showViewLikesHandler} />
                <TimeAgo time={postData.createdAt} />
              </div>
            </div>

            {isAuth && <AddComment />}
          </div>
        </div>
      </Modal>
    </>
  );
};
