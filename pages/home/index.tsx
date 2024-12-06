import { HomePage } from '@/pagesComponents';
import { useShowPostModal } from '@/shared/lib';
import { getConditionLayout } from '@/shared/providers';
import { PostModal } from '@/widget';
import { useRouter } from 'next/router';

export default function Page() {
  const { isOpen, postId, showPostModalHandler } = useShowPostModal();
  const router = useRouter();

  return getConditionLayout(
    <>
      {isOpen && (
        <PostModal pathOnClose={router.pathname} postId={postId} showPostModalHandler={showPostModalHandler} />
      )}
      <HomePage showPostModalHandler={showPostModalHandler} />
    </>
  );
}
