// @flow
import * as React from 'react';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';

import { useGetPublicPostsQuery } from '@/shared/api/public/publicApi';

import s from './Posts.module.scss';

type Props = {};
export const Posts = (props: Props) => {
  const [pageSize, setPageSize] = useState(4);
  const { data, error, isError, isLoading } = useGetPublicPostsQuery({ pageSize });

  return (
    <div className={s.grid}>
      {data?.items.map((item) => {
        return (
          <div className={s.postContainer} key={item.id}>
            <img alt={'postPhoto'} className={s.postPhoto} src={item.images[0]?.url} />
            <div>
              <img alt={'avatar'} className={s.avatar} src={item.avatarOwner} />
              <p>{item.userName}</p>
            </div>
            <div>
              {/*<p>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</p>*/}
              <ReactTimeAgo date={new Date(item.createdAt)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
