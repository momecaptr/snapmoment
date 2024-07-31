import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useLazyGetUserProfileQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation
} from '@/pagesComponents/statistics/ui/profile/inctagramProfileApi';
import { UpdateUserProfileArgs } from '@/pagesComponents/statistics/ui/profile/profileTypes';
import { Button, FormTextfield, Typography } from '@/shared/ui';
import { FormTextfieldArea } from '@/shared/ui/forms/FormTextFieldArea';
import { diffYears } from '@formkit/tempo';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

const profileSchema = z
  .object({
    aboutMe: z.string().max(200).optional(),
    city: z.string().max(30).optional(),
    country: z.string().max(30).optional(),
    dateOfBirth: z.string().date(),
    firstName: z
      .string()
      .min(1)
      .max(50)
      .regex(
        /^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/,
        'Only letters, numbers, dashes and underscores are allowed'
      ),
    lastName: z
      .string()
      .min(6)
      .max(30)
      .regex(/^[a-zA-ZА-Яа-я]+$/, 'Only latin and cyrillic letters are allowed'),
    userName: z
      .string()
      .min(6)
      .max(30)
      .regex(/^[a-zA-ZА-Яа-я]+$/, 'Only latin and cyrillic letters are allowed')
  })
  .superRefine((val, ctx) => {
    if (val.dateOfBirth) {
      const diff = diffYears(new Date(val.dateOfBirth), new Date());

      console.log(diff);

      if (diff > 13) {
        return;
      }

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A user under 13 cannot create a profile. Privacy Policy',
        path: ['dateOfBirth']
      });
    }
  });

export const ProfileTest = () => {
  const [getProfile, profile] = useLazyGetUserProfileQuery();
  const [mutate, { isError, isLoading: isLoadingMutate }] = useUpdateUserProfileMutation();
  const [uploadImage, { isLoading: isLoadingUploadImage }] = useUpdateUserAvatarMutation();
  const [file, setFile] = useState<File | null>(null);

  const { control, formState, handleSubmit, register } = useForm<UpdateUserProfileArgs>({
    defaultValues: async () => {
      const { data } = await getProfile();

      if (!data) {
        return {} as UpdateUserProfileArgs;
      }

      const dateOfBirth = data?.dateOfBirth;

      return {
        aboutMe: data.aboutMe ?? '',
        city: data.city ?? '',
        country: data.city ?? '',
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString().substring(0, 10) : undefined,
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        userName: data.userName
      };
    },
    resolver: zodResolver(profileSchema)
  });

  const onSubmit = handleSubmit((data) =>
    toast.promise(mutate(data).unwrap(), {
      error: 'Error while updating profile',
      loading: 'Loading...',
      success: 'Successfully updated profile'
    })
  );

  return (
    <div>
      <Typography as={'h1'}>{profile.data?.userName}</Typography>
      {JSON.stringify(profile.data, null, 2)}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!file) {
            return;
          }

          uploadImage({ file })
            .unwrap()
            .then(() => getProfile());
        }}
      >
        <img height={200} src={profile.data?.avatars?.[0].url} width={200} />
        <input
          onChange={(e) => {
            setFile(e.currentTarget.files?.[0] ?? null);
          }}
          name={'file'}
          type={'file'}
        />
        <Button type={'submit'}>Upload Avatar</Button>
      </form>
      <form onSubmit={onSubmit}>
        <FormTextfield control={control} label={'User Name'} name={'userName'} />
        <FormTextfield control={control} label={'First Name'} name={'firstName'} />
        <FormTextfield control={control} label={'Last Name'} name={'lastName'} />
        <input type={'date'} {...register('dateOfBirth')} style={{ color: 'black' }} />
        {!!formState.errors.dateOfBirth && (
          <p style={{ color: 'red' }}>
            A user under 13 cannot create a profile. <a href={'#'}>Privacy Policy</a>
          </p>
        )}
        <FormTextfield control={control} label={'Country'} name={'country'} />
        <FormTextfield control={control} label={'City'} name={'city'} />
        <FormTextfieldArea control={control} label={'About Me'} name={'aboutMe'} />
        <Button disabled={isLoadingMutate} type={'submit'}>
          Update Profile
        </Button>
      </form>
    </div>
  );
};
