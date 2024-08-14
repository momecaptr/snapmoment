import React, { useMemo } from 'react';

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

export const PhotoProfile: React.FC<Props> = ({ className, height = 192, square, width = 192 }) => {
  const { data, isLoading } = useGetUserProfilePhotoQuery();

  const memoizedClassName = useMemo(() => clsx(className, s.boxPhoto), [className]);

  const renderComponent = useMemo(() => {
    if (isLoading) {
      return <PhotoStub />;
    }

    if (data) {
      return (
        <Image
          alt={'Photo'}
          className={square ? s.photoSquare : s.photo}
          height={height}
          src={data.avatars[0]?.url || Stub}
          width={width}
        />
      );
    }

    return null;
  }, [data, isLoading, square, height, width]);

  return <div className={memoizedClassName}>{renderComponent}</div>;
};
