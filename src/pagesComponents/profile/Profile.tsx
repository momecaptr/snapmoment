import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMeQuery } from '@/shared/api/auth/authApi';
import { GetPostsResponse, GetPublicUserProfileResponse } from '@/shared/api/public/publicTypes';
import { ModalKey, useModal } from '@/shared/lib';
import { PhotoProfile, PhotosSwiper, Typography, Wrapper } from '@/shared/ui';
import { PostModal } from '@/widget';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './Profile.module.scss';

interface Props {
  postsUser?: GetPostsResponse;
  user?: GetPublicUserProfileResponse;
}

export const Profile = ({ postsUser, user }: Props) => {
  const { data: me } = useMeQuery();
  const [pickedId, setPickedId] = useState<number | undefined>();

  const router = useRouter();
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const postId = Number(router.query.postId);
  const { query, ...path } = router;
  const divRef = useRef(null);

  useEffect(() => {
    if (router.isReady && !isOpen && postId && postsUser?.items.find((post) => post.id === postId)) {
      setOpen(true);
    }
  }, [postId]); // Добавляем router.isReady в зависимости

  const showPostModalHandler = (isOpen: boolean, postId?: number) => {
    setOpen(isOpen);

    // Тут такая долгая цепь для того, чтобы если были другие query, поверх не записывались новые.
    if (postId) {
      // Копируем все существующие query-параметры, кроме id. По идее его там быть не должно, но какого-то черта (Если вывести в консоль) то мы его увидим.
      // И этот id -- это id пользователя. Он нам не нужен
      const { id, ...newQuery } = router.query; // Исключаем id из query

      console.log({ asda: router.query, newQuery });

      // Приводим postId к строке перед добавлением в query
      newQuery.postId = String(postId);

      // Обновляем URL с новым query, без параметра id
      router.push(
        {
          pathname: router.asPath.split('?')[0], // Оставляем текущий путь
          query: newQuery // Используем обновленный query без id пользователя
        },
        undefined,
        { shallow: true } // Shallow routing, чтобы не перезагружать страницу
      );
    }
  };

  useEffect(() => {
    console.log({ ref: divRef.current });
  }, [divRef]);

  if (!user) {
    return <>НИХРЕНА НЕТ</>;
  }

  return (
    <div className={s.container}>
      {isOpen && (
        <PostModal
          pathOnClose={`/profile/${user.id}`}
          postId={pickedId || postId}
          showPostModalHandler={showPostModalHandler}
        />
      )}
      <Wrapper className={s.wrapper}>
        <div className={s.box}>
          <div className={s.profilePhotoAndInfo}>
            <div className={s.boxPhotoProfile}>
              <PhotoProfile className={s.photo} />
            </div>
            <div className={s.personInfo}>
              <div className={s.nameAndButton}>
                <Typography variant={'regular_text_16'}>{user?.userName}</Typography>
                {me?.userId === user?.id && (
                  <Link className={s.button} href={'/profile/generalinfo'}>
                    <Typography variant={'regular_text_16'}>Profile Settings</Typography>
                  </Link>
                )}
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
                <Typography variant={'regular_text_14'}>{user?.aboutMe}</Typography>
              </div>
            </div>
          </div>
          <div className={s.post}>
            {postsUser?.items.map((post) => {
              return (
                <div className={s.postWrapper} key={post.id}>
                  {post.images && post.images.length > 0 ? (
                    <div
                      onClick={() => {
                        setPickedId(post.id);
                        showPostModalHandler(true, post.id);
                      }}
                      ref={divRef}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <PhotosSwiper className={s.usersPostPhotosSwiper} classNameImage={s.img} sliders={post.images} />
                    </div>
                  ) : (
                    <div>No image available</div> // Здесь можно разместить заглушку или текст
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
