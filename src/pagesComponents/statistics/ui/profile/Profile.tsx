import Link from 'next/link';
import { useRouter } from 'next/router';

export const Profile = () => {
  const router = useRouter();
  const id = router.query.id;

  return (
    <div>
      Profile for user {id} <Link href={'/profile/edit'}>Edit profile</Link>
    </div>
  );
};
