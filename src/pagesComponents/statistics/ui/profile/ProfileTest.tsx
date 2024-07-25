import React from 'react';
import { useForm } from 'react-hook-form';

import {
  useLazyGetUserProfileQuery,
  useUpdateUserProfileMutation
} from '@/pagesComponents/statistics/ui/profile/inctagramProfileApi';
import { UpdateUserProfileArgs } from '@/pagesComponents/statistics/ui/profile/profileTypes';
import { Button, FormTextfield, Typography } from '@/shared/ui';

export const ProfileTest = () => {
  const [getProfile, profile] = useLazyGetUserProfileQuery();
  const [mutate, { isError, isLoading: isLoadingMutate }] = useUpdateUserProfileMutation();

  const { control, formState, handleSubmit } = useForm<UpdateUserProfileArgs>({
    defaultValues: async () => {
      const { data } = await getProfile();

      if (!data) {
        return {} as UpdateUserProfileArgs;
      }

      console.log('defaultV', data);

      return { ...data, firstName: data.firstName ?? '', lastName: data.lastName ?? '' };
    }
  });

  return (
    <div>
      <Typography as={'h1'}>{profile.data?.userName}</Typography>
      {JSON.stringify(profile.data, null, 2)}
      <form onSubmit={handleSubmit(mutate)}>
        <FormTextfield control={control} label={'User Name'} name={'userName'} />
        <FormTextfield control={control} label={'First Name'} name={'firstName'} />
        <FormTextfield control={control} label={'Last Name'} name={'lastName'} />
        <Button disabled={isLoadingMutate} type={'submit'}>
          Update Profile
        </Button>
      </form>
    </div>
  );
};
