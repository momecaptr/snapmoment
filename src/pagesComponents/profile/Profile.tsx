import * as React from 'react';

import { GetPostsResponse, GetPublicUserProfileResponse } from '@/shared/api/public/publicTypes';
import { MyProfile } from '@/widget';

import s from './Profile.module.scss';

interface Props {
  postsUser?: GetPostsResponse;
  user?: GetPublicUserProfileResponse;
}

export const Profile = ({ postsUser, user }: Props) => {
  // const [getProfile, profile] = useLazyGetUserProfileQuery();
  // // const { data: profileData, isSuccess } = useGetUserProfileQuery();
  //
  // console.log({ profile });
  // const [mutate, { isLoading }] = useUpdateUserProfileMutation();
  // const { control, handleSubmit } = useForm<UpdateUserProfileArgs>({
  //   defaultValues: async () => {
  //     const { data } = await getProfile();
  //
  //     if (!data) {
  //       return {} as UpdateUserProfileArgs;
  //     }
  //
  //     return {
  //       ...data,
  //       firstName: data.firstName ?? '',
  //       lastName: data.lastName ?? ''
  //     };
  //   }
  //   // defaultValues: {
  //   //   ...profileData,
  //   //   firstName: profileData?.firstName ?? '',
  //   //   lastName: profileData?.lastName ?? ''
  //   // }
  // });
  console.log({ postsUser });

  return (
    <div className={s.container}>
      <MyProfile postsUser={postsUser} user={user} />
    </div>
  );
};
