import avatarMock from '@/../public/avatar-mock.jpg';
import { Typography } from '@/shared/ui';
import Image from 'next/image';

import s from './Author.module.scss';

type Props = {};

export const Author = ({}: Props) => {
  return (
    <div className={s.author}>
      <Image alt={'avatarMock'} className={s.authorPhoto} src={avatarMock} />

      <Typography variant={'h3'}>
        {/*userName*/}
        URLProfile
      </Typography>
    </div>
  );
};
