import { useForm } from 'react-hook-form';

import { UpdateUserProfileArgs } from '@/shared/api';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/shared/api/profile/profileApi';
import { Button, FormTextfield } from '@/shared/ui';

export const Profile = () => {
  // const [getProfile, profile] = useLazyGetUserProfileQuery();
  const { data: profileData, isSuccess } = useGetUserProfileQuery();

  console.log({ profileData });
  const [mutate, { isLoading }] = useUpdateUserProfileMutation();
  const { control, handleSubmit } = useForm<UpdateUserProfileArgs>({
    defaultValues: {
      ...profileData,
      firstName: profileData?.firstName ?? '',
      lastName: profileData?.lastName ?? ''
    }
  });

  return (
    <div>
      Profile
      <h1>{profileData?.userName}</h1>
      <form onSubmit={handleSubmit(mutate)}>
        {isSuccess && (
          <>
            <FormTextfield control={control} currentValue={profileData?.userName} name={'userName'} />
            <FormTextfield control={control} currentValue={profileData?.firstName} name={'firstName'} />
            <FormTextfield control={control} currentValue={profileData?.lastName} name={'lastName'} />
          </>
        )}
        <Button disabled={isLoading}>Update Profile</Button>
      </form>
    </div>
  );
};
