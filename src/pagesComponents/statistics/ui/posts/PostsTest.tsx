import React, { useState } from 'react';

import {
  useGetPublicPostsQuery,
  useUploadImagePostMutation
} from '@/pagesComponents/statistics/ui/posts/inctagramPublicPostApi';
import { Button } from '@/shared/ui';

export const PostsTest = () => {
  const [pageSize, setPageSize] = useState(4);
  const [files, setFiles] = useState<FileList | null>(null);

  const { data, isError, isLoading } = useGetPublicPostsQuery({ pageSize });
  const [uploadImage, { isLoading: isLoadingUploadImage }] = useUploadImagePostMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  // console.log(data);

  return (
    <div>
      <select name={'page size'} onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
        <option value={20}>20</option>
      </select>
      {data?.items?.map((post) => {
        return (
          <div key={post.id} style={{ marginBottom: '30px' }}>
            {JSON.stringify(post, null, 2)}
            {post.images.map((el) => (
              <img alt={'image123'} key={el.url} src={el.url} width={200} />
            ))}
          </div>
        );
      })}
      ----------------------------------------------------------------------------------------
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!files || !files.length) {
            return;
          }

          uploadImage({ files });
        }}
      >
        <input name={'file'} onChange={(e) => setFiles(e.currentTarget.files)} type={'file'} multiple />
        <Button disabled={isLoadingUploadImage}>Upload image</Button>
      </form>
    </div>
  );
};
