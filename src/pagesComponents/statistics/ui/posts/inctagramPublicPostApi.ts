import { inctagramApi } from '@/myApp/api/inctagramApi';
import { GetPostsArgs, GetPostsResponse } from '@/pagesComponents/statistics/ui/posts/postsTypes';

export const inctagramPublicPostApi = inctagramApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      deleteImagePost: builder.mutation<void, { id: string }>({
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `/v1/posts/image/${id}`
          };
        }
      }),
      getPublicPosts: builder.query<GetPostsResponse, GetPostsArgs>({
        query: ({ pageSize }) => {
          return {
            params: {
              pageSize,
              sortBy: 'createdAt',
              sortDirection: 'desc'
            },
            url: '/v1/public-posts/all'
          };
        }
      }),
      uploadImagePost: builder.mutation<GetPostsResponse['items'][0]['images'], { files: FileList }>({
        query: ({ files }) => {
          const formData = new FormData();

          Array.from(files).forEach((file) => {
            formData.append('file', file);
          });

          console.log(formData);

          return {
            body: formData,
            method: 'POST',
            url: '/v1/posts/image'
          };
        }
      })
    };
  }
});

export const { useGetPublicPostsQuery, useUploadImagePostMutation } = inctagramPublicPostApi;
