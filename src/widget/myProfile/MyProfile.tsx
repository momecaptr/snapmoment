import React, { Fragment, useEffect, useState } from 'react';

import { useMeQuery } from '@/shared/api/auth/authApi';
import { GetPostsResponse, GetPublicUserProfileResponse } from '@/shared/api/public/publicTypes';
import { ModalKey, useModal } from '@/shared/lib';
import { PhotoProfile, Typography, Wrapper } from '@/shared/ui';
import { PostModal } from '@/widget';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './MyProfile.module.scss';

interface Props {
  postsUser?: GetPostsResponse;
  user?: GetPublicUserProfileResponse;
}

export const MyProfile = ({ postsUser, user }: Props) => {
  // const { data } = useGetPersonalInformationUserQuery();
  const [pickedId, setPickedId] = useState<number | undefined>();

  // const { data: publicPostsByUserId } = useGetPublicPostsUserQuery({ userId: user?.id! }, { skip: !user?.id });
  // const { data: postsByUserName } = useGetPostsByUserNameQuery(
  //   { userName: user?.userName || '' },
  //   { skip: !user?.userName }
  // );

  const router = useRouter();
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const postId = Number(router.query.id);
  const { query, ...path } = router;

  useEffect(() => {
    if (postId && !isOpen) {
      setOpen(true);
    }
  }, [postId]);

  const showPostModalHandler = (isOpen: boolean, postId?: number) => {
    setOpen(isOpen);

    // Тут такая долгая цепь для того, чтобы если были другие query, поверх не записывались новые.
    if (postId) {
      // Копируем все существующие query-параметры, кроме id
      const { id, ...newQuery } = router.query; // Исключаем id из query

      // Приводим postId к строке перед добавлением в query
      newQuery.postId = String(postId);

      // Обновляем URL с новым query, без параметра id
      router.push(
        {
          pathname: router.asPath.split('?')[0], // Оставляем текущий путь
          query: newQuery // Используем обновленный query без id
        },
        undefined,
        { shallow: true } // Shallow routing, чтобы не перезагружать страницу
      );
    }
  };

  if (!user) {
    return <>НИХРЕНА НЕТ</>;
  }

  return (
    <>
      {isOpen && (
        <PostModal pathOnClose={`/profile/${user.id}`} postId={pickedId!} showPostModalHandler={showPostModalHandler} />
      )}
      <Wrapper className={s.wrapper}>
        <div className={s.box}>
          <div className={s.profilePhotoAndInfo}>
            <div className={s.boxPhotoProfile}>
              <PhotoProfile className={s.photo} />
            </div>
            <div className={s.personInfo}>
              <div className={s.nameAndButton}>
                {/*<Typography variant={'regular_text_16'}>{user?.userName || data?.userName}</Typography>*/}
                <Typography variant={'regular_text_16'}>{user?.userName}</Typography>
                <GoProfileSetting />
              </div>
              <div className={s.subscribleAndFollowers}>
                <div>
                  <Typography variant={'regular_text_16'}>2 218</Typography>
                  <Typography variant={'regular_text_16'}>Following</Typography>
                </div>
                <div>
                  <Typography variant={'regular_text_16'}>2 358</Typography>
                  <Typography variant={'regular_text_16'}>Followers</Typography>
                </div>
                <div>
                  <Typography variant={'regular_text_16'}>{postsUser?.totalCount}</Typography>
                  <Typography variant={'regular_text_16'}>Publications</Typography>
                </div>
              </div>
              <div className={s.profileInformation}>
                {/*<Typography variant={'regular_text_14'}>{user?.aboutMe || data?.aboutMe}</Typography>*/}
                <Typography variant={'regular_text_14'}>{user?.aboutMe}</Typography>
              </div>
            </div>
          </div>
          <div className={s.post}>
            {postsUser?.items.map((post) => {
              return (
                <div className={s.postWrapper} key={post.id}>
                  {post.images && post.images.length > 0 ? (
                    <img
                      onClick={() => {
                        setPickedId(post.id);
                        showPostModalHandler(true, post.id);
                      }}
                      alt={'post'}
                      src={post.images[0].url}
                    />
                  ) : (
                    <div>No image available</div> // Здесь можно разместить заглушку или текст
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export const GoProfileSetting = () => {
  const { data } = useMeQuery();

  return (
    <>
      {data && (
        <Link className={s.button} href={'/profile/generalinfo'}>
          <Typography variant={'regular_text_16'}>Profile Settings</Typography>
        </Link>
      )}
    </>
  );
};
