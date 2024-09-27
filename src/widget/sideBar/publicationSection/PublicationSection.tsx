// @flow
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import PersonOutline from '@/../public/assets/components/PersonOutline';
import {
  useGetUserProfileQuery,
  usePublishPostsImageMutation,
  usePublishPostsMutation
} from '@/shared/api/profile/profileApi';
import { publicApi } from '@/shared/api/public/publicApi';
import { useAppDispatch, useAppSelector, useCustomToast } from '@/shared/lib';
import { FormTextfield, FormTextfieldArea, Typography } from '@/shared/ui';
import { createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { useRefreshPostCreationData } from '@/widget/sideBar/lib/useRefreshPostCreationData';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { z } from 'zod';

import s from './PublicationSection.module.scss';

type Props = {
  className?: string;
  submitRef: React.RefObject<HTMLButtonElement>;
};
const addPostSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description should be less than 500 characters' }),
  location: z.string().optional()
});

export type AddPostType = z.infer<typeof addPostSchema>;

export const PublicationSection = (props: Props) => {
  const { className, submitRef } = props;

  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const { showToast } = useCustomToast();
  const { refreshPostCreationData } = useRefreshPostCreationData();

  const { data: profileData } = useGetUserProfileQuery();
  const [publishPostImages, { isLoading: isLoadingImages }] = usePublishPostsImageMutation();
  const [publishPostDescription, { isLoading: isLoadingDescription }] = usePublishPostsMutation();

  // toastId нужен для того, чтобы вы могли управлять одним и тем же тостером в разных запросах. Если вы не используете toastId, то каждый вызов showToast будет создавать новый тостер, и вы не сможете обновлять состояние уже существующего тостера.
  const [toastId, setToastId] = useState<null | number | string>(null);

  const refresh = () => {
    // ОБНОВЛЯЕМ ВСЕ C ЗАДЕРЖКОЙ В 1 сек???
    // new Promise((res) => {
    //   setTimeout(res, 1000);
    // }).then(() => {
    dispatch(publicApi.util.resetApiState()); // Сбрасываем кэш => перезагружаем запросы.
    refreshPostCreationData(); // Сбрасываеме стейт слайса
    // });
  };

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch
  } = useForm<AddPostType>({ mode: 'onSubmit', resolver: zodResolver(addPostSchema) });

  const onSubmit = async (data: AddPostType) => {
    const toastId = showToast({ message: 'Publishing post...', type: 'loading' });

    setToastId(toastId);

    try {
      const files = await Promise.all(
        allPostImages.map(async (el) => {
          const response = await fetch(el.buferUrl);
          const blob = await response.blob();

          // Создаем объект File, используя Blob
          return new File([blob], `${el.id}.jpg`, { type: blob.type }); // Имя файла можно задать по вашему усмотрению
        })
      );

      // Отправляем файлы на сервер
      const res = await publishPostImages(files).unwrap();

      const childrenMetadata = res.images.map((el) => ({ uploadId: el.uploadId }));

      await publishPostDescription({ childrenMetadata, description: data.description as string });

      refresh();

      showToast({ message: 'Post successfully published', type: 'success' });
    } catch (error) {
      showToast({ message: `Error occurred while publishing post: ${error}`, type: 'error' });
    } finally {
      setToastId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button ref={submitRef} style={{ display: 'none' }} type={'submit'}>
        submit
      </button>
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
              counterValue={`${watch('description')?.length || 0}/500`}
              error={errors.description?.message}
              label={'Add publication descriptions'}
              maxLength={500}
              name={'description'}
              placeholder={'Text-area'}
              resize
            />
          </div>
        </div>
        <div className={s.locationBox}>
          <FormTextfield
            control={control}
            error={errors.location?.message}
            label={'Add location'}
            name={'location'}
            placeholder={'Location'}
            style={{ background: 'transparent', border: '1px solid #4C4C4C' }}
            type={'location'}
          />
        </div>
      </div>
    </form>
  );
};
