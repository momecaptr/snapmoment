import SnapMomentLogo from '@/../public/assets/components/SnapMomentLogo';
import Link from 'next/link';

import s from './AppLogo.module.scss';

export const AppLogo = () => (
  <Link className={s.logoWrapper} href={'/'}>
    <SnapMomentLogo className={s.logo} />
  </Link>
);
