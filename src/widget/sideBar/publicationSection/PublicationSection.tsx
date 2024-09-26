// @flow
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import PersonOutline from '@/../public/assets/components/PersonOutline';
import { useGetUserProfileQuery } from '@/shared/api/profile/profileApi';
import { FormTextfield, FormTextfieldArea, Typography } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { z } from 'zod';

import s from './PublicationSection.module.scss';

type Props = {
  className?: string;
  onSubmitHandler: (value: AddPostType) => void;
};
const addPostSchema = z.object({
  description: z.string().max(500, { message: 'Description should be less than 500 characters' }).optional(),
  // todo ДОБАВИТЬ ЛОКАЦИЮ???
  location: z.string().optional()
});

export type AddPostType = z.infer<typeof addPostSchema>;

export const PublicationSection = (props: Props) => {
  const { className, onSubmitHandler } = props;
  const [textArea, setTextArea] = useState('');
  const { data: profileData } = useGetUserProfileQuery();

  // Здесь и отправлять запрос на публикацию
  // todo Валидацию zod сделать
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch
  } = useForm<AddPostType>({ mode: 'onSubmit', resolver: zodResolver(addPostSchema) });

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setTextArea(value);
  };

  const handlerFormSubmit: SubmitHandler<AddPostType> = (data) => {
    console.log(watch('description'));
    console.log({ data });
    onSubmitHandler(data);
  };

  return (
    <form onSubmit={handleSubmit(handlerFormSubmit)}>
      <button>CLICK</button>
      <div className={s.container}>
        <div className={s.upperSection}>
          <div className={s.userData}>
            {profileData?.avatars[0] ? (
              <Image alt={'postImg'} className={s.avatar} height={100} src={profileData.avatars[0].url} width={100} />
            ) : (
              <PersonOutline className={s.avatarBordered} />
            )}
            <Typography variant={'h3'}>{profileData?.userName}</Typography>
          </div>

          <div className={s.textAreaWrapper}>
            <FormTextfieldArea
              classNameTextAreaSize={s.textAreaSize}
              control={control}
              counterValue={`${watch('description')?.length}/500`}
              // currentValue={textArea}
              // ! Для currentValue нужно другое - с сервера
              label={'Add publication descriptions'}
              maxLength={500}
              name={'description'}
              placeholder={'Text-area'}
              resize
            />
          </div>
        </div>
        <div className={s.locationBox}>
          {/*<Input*/}
          {/*  label={'Add location'}*/}
          {/*  name={'location'}*/}
          {/*  style={{ background: 'transparent', border: '1px solid #4C4C4C' }}*/}
          {/*  type={'location'}*/}
          {/*/>*/}
          <FormTextfield
            control={control}
            label={'Add location'}
            name={'location'}
            placeholder={'Location'}
            style={{ background: 'transparent', border: '1px solid #4C4C4C' }}
          />
        </div>
      </div>
    </form>
  );
};
