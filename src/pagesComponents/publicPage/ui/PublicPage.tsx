import * as React from 'react';
import { Fragment, useEffect } from 'react';

import { getStaticProps } from '@/../pages';
import { getServerSideProps } from '@/../pages/public/posts';
import { RegisteredUsersCounter } from '@/entities';
import { Item } from '@/shared/api/public/publicTypes';
import { ModalKey, useModal } from '@/shared/lib';
import { UserCard, ViewPostModal } from '@/widget';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import s from './PublicPage.module.scss';

// export default function PublicPage({
//   postComments,
//   postData,
//   postLikes,
//   posts
// }: {
//   posts: Item[];
// } & InferGetServerSidePropsType<typeof getServerSideProps> &
//   InferGetStaticPropsType<typeof getStaticProps>) {
const PublicPage = ({
  postComments,
  postData,
  postLikes,
  posts
}: {
  posts: Item[];
} & InferGetServerSidePropsType<typeof getServerSideProps> &
  InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);

  useEffect(() => {
    if (router.query.id) {
      setOpen(true);
    }
  }, [router.query.id]);

  const showViewPostModalHandler = (postId: number) => {
    setOpen(true);
    router.push(`/public/posts/?id=${postId}`, undefined, { shallow: true });
  };

  return (
    <>
      {isOpen && postData && <ViewPostModal postComments={postComments} postData={postData} postLikes={postLikes} />}

      <section className={s.container}>
        <RegisteredUsersCounter />

        <div className={s.cards}>
          {posts?.map((post) => (
            <Fragment key={post.id}>
              <UserCard post={post} showViewPostModalHandler={showViewPostModalHandler} />
            </Fragment>
          ))}
        </div>
      </section>
    </>
  );
};

export default PublicPage;
