import { Typography } from '@/shared/ui';
import { UserCard } from '@/widget/userCard/UserCard';

import s from './PublicPage.module.scss';
type Props = {};

export const PublicPage = ({}: Props) => {
  return (
    <>
      <section className={s.container}>
        <div className={s.title}>
          <Typography variant={'h2'}>Registered users:</Typography>
          <div className={s.counter}>
            {/*промапить данные с сервера*/}
            <Typography className={s.count} variant={'h2'}>
              0
            </Typography>
            <Typography className={s.count} variant={'h2'}>
              0
            </Typography>
            <Typography className={s.count} variant={'h2'}>
              9
            </Typography>
            <Typography className={s.count} variant={'h2'}>
              2
            </Typography>
            <Typography className={s.count} variant={'h2'}>
              1
            </Typography>
            <Typography className={s.count} variant={'h2'}>
              3
            </Typography>
          </div>
        </div>

        <div className={s.cards}>
          {/*пробежаться мапом*/}
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </section>
    </>
  );
};
