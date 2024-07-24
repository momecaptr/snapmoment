import React from 'react';

import GitHub from '@/../public/assets/components/GithubSvgrepoCom';

export const GithubAuthButton = () => {
  return (
    <button onClick={() => window.location.assign('https://inctagram.work/api/v1/auth/github/login')}>
      <GitHub height={36} width={36} />
    </button>
  );
};
