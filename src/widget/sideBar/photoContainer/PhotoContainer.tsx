import { ChangeEvent } from 'react';

import Image from 'next/image';

import s from './PhotoContainer.module.scss';

type PhotoContainerProps = {
  addImage: (e: ChangeEvent<HTMLInputElement>) => void;
  images: string[];
};

/**
 * Компонент для отображения картинок. Если более 1 то отображается в виде карусели.
 * @param props
 * @constructor
 */
export const PhotoContainer = (props: PhotoContainerProps) => {
  const { addImage, images } = props;

  return (
    <div className={s.photoContainer}>
      <Image alt={'photo preview'} className={s.photoProfileWithCircle} height={340} src={images[0]} width={332} />
    </div>
  );
};
