import Image from 'next/image';

import s from './PhotoContainer.module.scss';

type PhotoContainerProps = {
  // addImage: (e: ChangeEvent<HTMLInputElement>) => void;
  images: string[];
};

/**
 * Компонент для отображения картинок. Если более 1 то отображается в виде карусели.
 * @param props
 * @constructor
 */
export const PhotoContainer = (props: PhotoContainerProps) => {
  const { images } = props;

  return (
    <div className={s.singlePhotoWrapper}>
      <Image alt={'photo preview'} className={s.singlePhoto} height={340} src={images[0]} width={332} />
    </div>
  );
};
