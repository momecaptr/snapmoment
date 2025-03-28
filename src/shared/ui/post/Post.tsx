import React from 'react';

import { Item } from '@/shared/api/public/publicTypes';
import { clsx } from 'clsx';
import Link from 'next/link';

import s from './Post.module.scss';

type Props = {
  className?: string;
  post: Item;
  setPickedId?: (id: number) => void;
};
export const Post = (props: Props) => {
  const { className, post, setPickedId } = props;

  console.log(post);

  return (
    // <Link className={clsx(s.box, className)} href={`public/post/${post.id}`}>
    <Link className={clsx(s.box, className)} href={'#'}>
      {post.images && post.images.length > 0 ? (
        <img alt={'post'} src={post.images[0].url} />
      ) : (
        <div>No image available</div> // Здесь можно разместить заглушку или текст
      )}
    </Link>
  );
};
