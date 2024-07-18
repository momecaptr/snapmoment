import avatarMock from '@/../public/avatar-mock.jpg';
import { appSlice } from '@/app/model/appSlice';
import { ModalKey, useAppDispatch } from '@/shared/lib';
import { Typography } from '@/shared/ui';
import Image from 'next/image';

import s from './ShowLikers.module.scss';

type Props = {};

export const ShowLikers = ({}: Props) => {
  const dispatch = useAppDispatch();

  const showViewLikesHandler = () => {
    dispatch(appSlice.actions.toggleModal({ key: ModalKey.ViewLikes, open: true }));
  };

  return (
    <div className={s.root}>
      <div className={s.likes}>
        <button className={s.usersLikes} onClick={showViewLikesHandler}>
          {/*стили фоток доделать*/}
          {/*фотки юзеров*/}
          <Image alt={'avatarMock'} src={avatarMock} />
          <Image alt={'avatarMock'} src={avatarMock} />
          <Image alt={'avatarMock'} src={avatarMock} />
        </button>
        <Typography variant={'regular_text_14'}>
          2 243{' '}
          <Typography as={'span'} variant={'bold_text_14'}>
            &quot;Like&quot;
          </Typography>
        </Typography>
      </div>
      <Typography className={s.date} variant={'small_text'}>
        July 3, 2021
      </Typography>
    </div>
  );
};
