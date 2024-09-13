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

import s from './PostModal.module.scss';

type Props = {
  postComments: GetPostCommentsByPostIdResponse;
  postData: GetPostByIdResponse;
  postLikes: GetPostLikesResponse;
};

export const PostModal = ({ postComments, postData, postLikes }: Props) => {
  const router = useRouter();
  const { data: me } = useMeQuery();
  const { isOpen, setOpen } = useModal(ModalKey.ViewLikes);

  const isAuth = !!me?.userId;

  const showViewLikesHandler = () => {
    setOpen(true);
  };

  const setCloseModalHandler = () => {
    router.back();
  };

  return (
    postData && (
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
    )
  );
};
