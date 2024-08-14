import * as React from 'react';

import { wrapper } from '@/myApp/store';
import { getPostById } from '@/shared/api/public/publicApi';
import { Item } from '@/shared/api/public/publicTypes';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

const PublicPostModal = ({ post }: { post: Item }) => {
  // const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  //
  // const [getPostCommentsByPostId, { data: postComments, isFetching: isFetchingPostComments }] =
  //   useLazyGetPostCommentsByPostIdQuery();
  // const [getPostLikes, { data: postLikes, isFetching: isFetchingPostLikes }] = useLazyGetPostLikesQuery();
  // const { data: me } = useMeQuery();

  return (
    <div>
      {/*<ViewPostModal*/}
      {/*  isAuth={!!me?.userId}*/}
      {/*  isFetching={false}*/}
      {/*  openViewPhoto={isOpen}*/}
      {/*  postComments={postComments}*/}
      {/*  postData={post}*/}
      {/*  postLikes={postLikes}*/}
      {/*  setOpenViewPhoto={setOpen}*/}
      {/*/>*/}
      <p>{post.id}</p>
      <p>{post.userName}</p>
      <Image alt={post.images[0].url} height={200} src={post.images[0].url} width={200} />
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
