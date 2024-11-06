import React from 'react';

import { wrapper } from '@/myApp/store';
import { Profile } from '@/pagesComponents/profile/Profile';
import { getPublicPostsUser, getPublicUserProfile } from '@/shared/api/public/publicApi';
import { GetPostsResponse, GetPublicUserProfileResponse } from '@/shared/api/public/publicTypes';
import { getAuthorizedLayout } from '@/shared/providers';
import { GetServerSideProps } from 'next';

interface Props {
  postsUser?: GetPostsResponse;
  user?: GetPublicUserProfileResponse;
}

export default function Page({ postsUser, user }: Props) {
  return (
    <>
      <Profile postsUser={postsUser} user={user} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params!;
  const profileId = Number(id);

  const publicUserPromise = await store.dispatch(getPublicUserProfile.initiate({ profileId }));
  const publicPostsUserPromise = await store.dispatch(
    getPublicPostsUser.initiate({
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId: profileId
    })
  );

  const res = await Promise.all([publicUserPromise, publicPostsUserPromise]);

  const user = res[0].data;
  const postsUser = res[1].data;

  return {
    props: {
      postsUser,
      user
    }
  };
});

Page.getLayout = getAuthorizedLayout;
