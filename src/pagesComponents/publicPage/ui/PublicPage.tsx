import * as React from 'react';
import { Fragment } from 'react';

import { RegisteredUsersCounter } from '@/entities';
import { Item } from '@/shared/api/public/publicTypes';
import { UserCard } from '@/widget';

import s from './PublicPage.module.scss';

type Props = {
  posts: Item[];
  showViewPostModalHandler: (postId: number) => void;
};

export default function PublicPage({ posts, showViewPostModalHandler }: Props) {
  return (
    <>
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
}
