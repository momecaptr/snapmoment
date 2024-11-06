import { HomePage } from '@/pagesComponents';
import { useShowPostModal } from '@/shared/lib';
import { getConditionLayout } from '@/shared/providers';
import { PostModal } from '@/widget';

export default function Page() {
  const { isOpen, postId, showPostModalHandler } = useShowPostModal();

  return getConditionLayout(
    <>
      {isOpen && <PostModal postId={postId} showPostModalHandler={showPostModalHandler} />}
      <HomePage showPostModalHandler={showPostModalHandler} />
    </>
  );
}
