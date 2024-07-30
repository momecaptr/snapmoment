import { useEffect } from 'react';

import { useRouter } from 'next/router';

const GithubAuthHandler = () => {
  const router = useRouter();
  const { accessToken, email } = router.query;

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', String(accessToken));

      router.push('/profile');
    }
  }, [accessToken, email, router]);

  return <div>Loading...</div>;
};

export default GithubAuthHandler;
