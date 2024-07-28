import { useForm } from 'react-hook-form';

import { UpdateUserProfileArgs } from '@/shared/api';
import { useLazyGetUserProfileQuery, useUpdateUserProfileMutation } from '@/shared/api/profile/profileApi';
import { Button, FormTextfield } from '@/shared/ui';

export const Profile = () => {
  const [getProfile, profile] = useLazyGetUserProfileQuery();

  console.log({ profile });
  const [mutate, { isLoading }] = useUpdateUserProfileMutation();
  const { control, handleSubmit } = useForm<UpdateUserProfileArgs>({
    defaultValues: async () => {
      const { data } = await getProfile();

      if (!data) {
        return {} as UpdateUserProfileArgs;
      }

      return {
        ...data,
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? ''
      };
    }
  });

  return (
    <div>
      Profile
      <h1>{profile?.data?.userName}</h1>
      <form onSubmit={handleSubmit(mutate)}>
        {profile?.data && (
          <>
            <FormTextfield control={control} currentValue={profile?.data?.userName} name={'userName'} />
            <FormTextfield control={control} currentValue={profile?.data?.firstName} name={'firstName'} />
            <FormTextfield control={control} currentValue={profile?.data?.lastName} name={'lastName'} />
          </>
        )}
        <Button disabled={isLoading}>Update Profile</Button>
      </form>
    </div>
  );
};
