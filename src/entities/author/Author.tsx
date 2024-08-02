import avatarMock from '@/../public/avatar-mock.jpg';
import { Typography } from '@/shared/ui';
import Image from 'next/image';

import s from '@/../src/entities/author/Author.module.scss';

type Props = {
  name: string;
  photo?: string;
};

export const Author = ({ name, photo }: Props) => {
  return (
    <div className={s.author}>
      <Image
        alt={'author avatar'}
        className={s.authorPhoto}
        height={100}
        src={photo || avatarMock}
        width={100}
        unoptimized
      />

      <Typography variant={'h3'}>{name}</Typography>
    </div>
  );
};
