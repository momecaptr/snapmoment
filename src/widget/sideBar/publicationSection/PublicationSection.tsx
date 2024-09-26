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
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { z } from 'zod';

import s from './PublicationSection.module.scss';

type Props = {
  className?: string;
  submitRef: React.RefObject<HTMLButtonElement>;
};
const addPostSchema = z.object({
  description: z.string().max(500, { message: 'Description should be less than 500 characters' }).optional(),
  // todo ДОБАВИТЬ ЛОКАЦИЮ???
  location: z.string().optional()
});

export type AddPostType = z.infer<typeof addPostSchema>;

export const PublicationSection = (props: Props) => {
  const { className, submitRef } = props;
  const [textArea, setTextArea] = useState('');

  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const { showToast } = useCustomToast();

  const { data: profileData } = useGetUserProfileQuery();
  const [publishPostImages, { isLoading: isLoadingImages }] = usePublishPostsImageMutation();
  const [publishPostDescription, { isLoading: isLoadingDescription }] = usePublishPostsMutation();

  const refresh = () => {
    // ОБНОВЛЯЕМ ВСЕ C ЗАДЕРЖКОЙ В 1 сек
    new Promise((res) => {
      setTimeout(res, 1000);
    }).then(() => {
      dispatch(publicApi.util.resetApiState()); // Сбрасываем кэш => перезагружаем запросы.
      dispatch(createPostActions.setAllPostImgs({ images: [] }));
    });
  };

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch
  } = useForm<AddPostType>({ mode: 'onSubmit', resolver: zodResolver(addPostSchema) });

  // const onSubmit = (data: AddPostType) => {
  //   console.log({ data });
  //   // todo Отправляем на сервер данные
  //   publishPostImages(
  //     allPostImages.map((el) => {
  //       console.log(el.buferUrl);
  //
  //       return el.buferUrl;
  //     })
  //   )
  //     .unwrap()
  //     .then((res) => {
  //       console.log(res);
  //       const childrenMetadata = res.images.map((el) => ({ uploadId: el.uploadId }));
  //
  //       console.log({ childrenMetadata });
  //
  //       console.log('response post images');
  //
  //       publishPostDescription({ childrenMetadata, description: data.description as string });
  //     })
  //     .then(() => {
  //       console.log('response postS received');
  //       // ОБНОВЛЯЕМ ВСЕ C ЗАДЕРЖКОЙ В 1 сек
  //       // refresh();
  //     })
  //     .catch((error) => {
  //       showToast({ message: `${error}`, type: 'error' });
  //     });
  // };

  const onSubmit = async (data: AddPostType) => {
    console.log({ data });

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

      console.log(res);
      const childrenMetadata = res.images.map((el) => ({ uploadId: el.uploadId }));

      console.log({ childrenMetadata });
      console.log('response post images');

      await publishPostDescription({ childrenMetadata, description: data.description as string });

      console.log('response postS received');
      // refresh(); // обновляем все с задержкой в 1 сек
    } catch (error) {
      console.error('Ошибка загрузки изображений:', error);
      showToast({ message: `${error}`, type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button ref={submitRef} style={{ display: 'none' }} type={'submit'}>
        CLICK
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
              counterValue={`${watch('description')?.length}/500`}
              error={errors.description?.message}
              label={'Add publication descriptions'}
              maxLength={501}
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
