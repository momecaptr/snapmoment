import React from 'react';

import PhotoStub from '@/../public/assets/components/PhotoStub';
import Stub from '@/../public/epicpen_6ymMwEsBEI.png';
import { useGetUserProfilePhotoQuery } from '@/shared/api/mainPhotoProfile/mainPhotoProfileAPI';
import clsx from 'clsx';
import Image from 'next/image';

import s from './PhotoProfile.module.scss';

type Props = {
  className?: string;
  height?: number;
  square?: boolean;
  width?: number;
};

export const PhotoProfile: React.FC<Props> = (props) => {
  const { className, height, square, width } = props;
  const { data, isLoading } = useGetUserProfilePhotoQuery();

  const renderComponent = isLoading ? (
    <PhotoStub />
  ) : (
    data && (
      <Image
        alt={'Photo'}
        className={square ? s.photoSquare : s.photo}
        height={height || 192}
        src={data.avatars[0]?.url || Stub}
        width={width || 192}
      />
    )
  );

  return <div className={clsx(className, s.boxPhoto)}>{renderComponent}</div>;
};
