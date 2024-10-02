import * as React from 'react';
import { useRef, useState } from 'react';

import CloseOutline from '@/../public/assets/components/CloseOutline';
import { Author, Comment } from '@/entities';
import { AddComment, ShowLikers, TimeAgo } from '@/features';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { useGetPostLikesQuery, useUpdateUsersPostMutation } from '@/shared/api/posts/postsApi';
import { useGetPostByIdQuery, useGetPostCommentsByPostIdQuery } from '@/shared/api/public/publicApi';
import { ModalKey, useCustomToast, useModal } from '@/shared/lib';
import { Button, Modal, PhotosSwiper } from '@/shared/ui';
import { PostInteractionBar, UsersLikesModal } from '@/widget';
import { CloseEditModal } from '@/widget/modals/postModal/closeEditModal/CloseEditModal';
import { PostModalBurgerDropDown } from '@/widget/modals/postModal/postModalBurgerDropDown/PostModalBurgerDropDown';
import { PublicationSection } from '@/widget/sideBar/createPostModal/ui/publicationSection/PublicationSection';
import { useRouter } from 'next/router';

import s from './PostModal.module.scss';

type Props = {
  pathOnClose?: string;
  postId: number;
  showPostModalHandler: (isOpen: boolean, postId?: number) => void;
};

/**
 * Компонент `PostModal` — модальное окно, отображающее информацию о посте,
 * включая фотографии, комментарии и действия над постом.
 *
 * @param {number} postId - Уникальный идентификатор поста, для которого отображается модальное окно.
 * @param {function} showPostModalHandler - Функция, отвечающая за открытие/закрытие модального окна. Принимает два параметра:
 *  - isOpen (boolean): флаг, указывающий, открыто ли модальное окно.
 *  - postId (number | undefined): идентификатор поста (опционально).
 * @param {string} props.pathOnClose Путь, на который перейдет приложение после закрытия модалки поста.
 */
export const PostModal = ({ pathOnClose, postId, showPostModalHandler }: Props) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { isOpen, setOpen } = useModal(ModalKey.ViewLikes);
  const { isOpen: isDeleteModalOpen, setOpen: setIsDeleteModalOpen } = useModal(ModalKey.DeletePost);
  const { isOpen: isCloseEditPostModalOpen, setOpen: setIsCloseEditPostModalOpen } = useModal(ModalKey.CloseEditPost);
  const { showToast } = useCustomToast();
  const router = useRouter();

  const { data: me } = useMeQuery();
  const { data: postData } = useGetPostByIdQuery({ postId: postId || null });
  const { data: postComments } = useGetPostCommentsByPostIdQuery({ postId: postId || null });
  const { data: postLikes } = useGetPostLikesQuery({ postId: postId || null });
  const [updatePost, { isLoading: isLoadingUpdatePost }] = useUpdateUsersPostMutation();

  const isAuth = !!me?.userId;

  const showViewLikesHandler = () => {
    setOpen(true);
  };

  {
    /* Функция для редактирования поста */
  }
  const newDescriptionHandler = async (newDescription: string) => {
    if (newDescription !== postData?.description) {
      showToast({ message: 'Updating post...', type: 'loading' });
      try {
        await updatePost({ description: newDescription, postId: postId as number }).unwrap();
        showToast({ message: 'Post updated successfully', type: 'success' });
      } catch (error) {
        showToast({ message: `Error occurred while updating post: ${error}`, type: 'error' });
      }
    }
    setIsCloseEditPostModalOpen(false);
    setIsEditMode(false);
  };

  {
    /* Функция для закрытия модалки поста в целом */
  }
  const setCloseModalHandler = () => {
    if (isEditMode) {
      setIsCloseEditPostModalOpen(true);

      return;
    }
    showPostModalHandler(false);
    // router.push('/', undefined, { shallow: true });
    // ! Это для того, чтобы возвращаться на ту страницу где были, либо на главную страницу
    pathOnClose ? router.push(pathOnClose) : router.push('/', undefined, { shallow: true });
  };

  return (
    postData && (
      <>
        <CloseEditModal
          editModeHandler={() => setIsEditMode(false)}
          isOpen={isCloseEditPostModalOpen}
          setOpen={setIsCloseEditPostModalOpen}
        />
        {isOpen && <UsersLikesModal postLikes={postLikes} setOpen={setOpen} open />}

        <Modal className={s.modal} onOpenChange={setCloseModalHandler} title={''} open>
          <button className={s.closeBtn} onClick={setCloseModalHandler}>
            <CloseOutline className={s.closeIcon} />
          </button>

          <div className={s.container}>
            <div className={s.photos}>
              <PhotosSwiper sliders={postData.images} />
            </div>

            <div className={s.about}>
              {!isEditMode ? (
                <>
                  <div className={s.authorBlock}>
                    <div className={s.authorWrapper}>
                      <Author name={postData.userName} photo={postData.avatarOwner} />
                      {/*{isAuth && <MoreActions />}*/}
                      {isAuth && <PostModalBurgerDropDown changeEditMode={() => setIsEditMode(true)} />}
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
                </>
              ) : (
                <>
                  <PublicationSection
                    changeEditMode={() => setIsEditMode(false)}
                    description={postData.description}
                    isLocationBar={false}
                    newDescriptionHandler={newDescriptionHandler}
                    postId={postData.id}
                    submitRef={submitRef}
                    type={'edit'}
                  />
                  <div className={s.editButton}>
                    <Button onClick={() => submitRef.current?.click()}>Save Changes</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      </>
    )
  );
};
