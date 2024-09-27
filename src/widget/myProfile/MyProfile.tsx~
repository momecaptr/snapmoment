import React from 'react';

import { useMeQuery } from '@/shared/api/auth/authApi';
import { useGetPostsByUserNameQuery } from '@/shared/api/posts/postsApi';
import { useGetPublicPostsUserQuery } from '@/shared/api/public/publicApi';
import { GetPostsResponse, GetPublicUserProfileResponse } from '@/shared/api/public/publicTypes';
import { PhotoProfile, Post, Typography, Wrapper } from '@/shared/ui';
import Link from 'next/link';

import s from './MyProfile.module.scss';

interface Props {
  postsUser?: GetPostsResponse;
  user?: GetPublicUserProfileResponse;
}

export const MyProfile = ({ postsUser, user }: Props) => {
  // const { data } = useGetPersonalInformationUserQuery();

  const { data: publicPostsByUserId } = useGetPublicPostsUserQuery({ userId: user?.id! }, { skip: !user?.id });
  const { data: postsByUserName } = useGetPostsByUserNameQuery(
    { userName: user?.userName || '' },
    { skip: !user?.userName }
  );

  console.log({ userNamePosts: postsByUserName }); // Данные получилось получить только тут, но нет Images А ОНИ ПОЯВИЛИСЬ В ЛОГАХ (ЛЕНЯ ШУЛЯК КОЛДУН)

  return (
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
        {/* ! Почему postsUser?.items.map ничего не отображается??*/}
        {/*  {postsUser?.items.map((post) => {*/}
        {/* ! Да и тут ничего нет, массив IMAGES undefined от GETPOSTSBY USERNAME*/}
        {/*  {postsByUserName?.items?.map((post) => {*/}
        {/* Однажды на мгновение увидел пост от publicPostsByUserId */}
        <div className={s.post}>
          {publicPostsByUserId?.items.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </div>
        <div className={s.post}>
          {postsByUserName?.items?.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </div>
      </div>
    </Wrapper>
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
