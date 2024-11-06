import { useEffect, useRef } from 'react';

import { ModalKey, useModal } from '@/shared/lib';
import { useRouter } from 'next/router';

export const useShowPostModal = () => {
  const router = useRouter();
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const postId = Number(router.query.id);
  const oldPathRef = useRef(router.asPath);
  const oldPath = oldPathRef.current;
  const { pathname, query: oldQuery } = router;

  useEffect(() => {
    if (postId && !isOpen) {
      setOpen(true);
    }
  }, [postId]);

  const showPostModalHandler = (isOpen: boolean, postId?: number) => {
    setOpen(isOpen);

    if (postId) {
      const newQuery = { ...oldQuery, id: postId };

      router.push({ pathname, query: newQuery }, undefined, { shallow: true });
    }
  };

  return {
    isOpen,
    oldPath,
    postId,
    showPostModalHandler
  };
};
