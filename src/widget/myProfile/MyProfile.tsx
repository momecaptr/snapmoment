import React from 'react';

import { useGetPersonalInformationUserQuery } from '@/shared/api/personalInformationUser/personalInformationUserAPI';
import { PhotoProfile, Post, Typography, Wrapper } from '@/shared/ui';
import Link from 'next/link';

import s from './MyProfile.module.scss';
export const MyProfile = () => {
  const { data } = useGetPersonalInformationUserQuery();

  return (
    <Wrapper className={s.wrapper}>
      <div className={s.box}>
        <div className={s.profilePhotoAndInfo}>
          <div className={s.boxPhotoProfile}>
            <PhotoProfile className={s.photo} />
          </div>
          <div className={s.personInfo}>
            <div className={s.nameAndButton}>
              <Typography variant={'regular_text_16'}>{data?.userName}</Typography>
              <Link className={s.button} href={'/profile/generalinfo'}>
                <Typography variant={'regular_text_16'}>Profile Settings</Typography>
              </Link>
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
                <Typography variant={'regular_text_16'}>2 764</Typography>
                <Typography variant={'regular_text_16'}>Publications</Typography>
              </div>
            </div>
            <div className={s.profileInformation}>
              <Typography variant={'regular_text_14'}>{data?.aboutMe}</Typography>
            </div>
          </div>
        </div>
        <div className={s.post}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </Wrapper>
  );
};
