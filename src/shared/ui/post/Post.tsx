import React from 'react';

import { Item } from '@/shared/api/public/publicTypes';
import { clsx } from 'clsx';
import Link from 'next/link';

import s from './Post.module.scss';

type Props = {
  className?: string;
  post: Item;
};
export const Post = (props: Props) => {
  const { className, post } = props;

  console.log(post);

  return (
    <Link className={clsx(s.box, className)} href={`public/post/${post.id}`}>
      {post.images && post.images.length > 0 ? (
        <img alt={'post'} src={post.images[0].url} />
      ) : (
        <div>No image available</div> // Здесь можно разместить заглушку или текст
      )}
    </Link>
  );
};
