import React from 'react';

import PhotoStub from '@/../public/assets/components/PhotoStub';
import clsx from 'clsx';

import s from './PostPhotosFromServer.module.scss';

type PropsPhotos = {
  className?: string;
  height?: number;
  square?: boolean;
  width?: number;
};

/**
 * Компонент для отображения фото постов с сервера
 * @param props
 * @constructor
 */

export const PostPhotosFromServer = (props: PropsPhotos) => {
  const { className, height = 192, square, width = 192 } = props;

  // const renderComponent = useMemo(() => {
  //   if (isLoading) {
  //     return <PhotoStub />;
  //   }
  //
  //   if (data) {
  //     return (
  //       <Image
  //         alt={'Photo'}
  //         className={square ? s.photoSquare : s.photo}
  //         height={height}
  //         src={data.avatars[0]?.url || Stub}
  //         width={width}
  //       />
  //     );
  //   }
  //
  //   return null;
  // }, [data, isLoading, square, height, width]);

  return (
    <div className={clsx(className, s.boxPhoto)}>
      <PhotoStub />
    </div>
  );
};
