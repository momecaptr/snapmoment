import * as React from 'react';

import { wrapper } from '@/myApp/store';
import {
  Item,
  getPostById,
  useLazyGetPostCommentsByPostIdQuery,
  useLazyGetPostLikesQuery,
  useMeQuery
} from '@/shared/api';
import { ModalKey, useModal } from '@/shared/lib';
import { ViewPostModal } from '@/widget';
import { GetServerSideProps } from 'next';

const PublicPostModal = ({ post }: { post: Item }) => {
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);

  const [getPostCommentsByPostId, { data: postComments, isFetching: isFetchingPostComments }] =
    useLazyGetPostCommentsByPostIdQuery();
  const [getPostLikes, { data: postLikes, isFetching: isFetchingPostLikes }] = useLazyGetPostLikesQuery();
  const { data: me } = useMeQuery();

  return (
    <div>
      <ViewPostModal
        isAuth={!!me?.userId}
        isFetching={false}
        openViewPhoto={isOpen}
        postComments={postComments}
        postData={post}
        postLikes={postLikes}
        setOpenViewPhoto={setOpen}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params!;
  const postId = Number(id);

  const postPromise = await store.dispatch(getPostById.initiate({ postId }));

  const post = postPromise.data || null;

  return {
    props: {
      post
    }
  };
});

export default PublicPostModal;
