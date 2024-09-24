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

  return (
    <Link className={clsx(s.box, className)} href={`public/post/${post.id}`}>
      <img alt={'post'} src={post.images[0].url || ''} />
    </Link>
  );
};
