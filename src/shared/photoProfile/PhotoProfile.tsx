import React from 'react';

import s from './PhotoProfile.module.scss';

import PhootoStub from '../../../public/assets/components/PhootoStub';

type Props = {};
const PhotoProfile = () => {
  return (
    <div className={s.boxPhoto}>
      <PhootoStub height={48} width={48} />
    </div>
  );
};

export default PhotoProfile;
