import { GetPostsArgs, GetPostsResponse } from '@/shared/api';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

export const publicApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPublicPosts: builder.query<GetPostsResponse, GetPostsArgs>({
      query: ({ pageSize }) => ({
        params: {
          pageSize,
          sortBy: 'createdAt',
          sortDirection: 'desc'
        },
        url: 'v1/public-posts/all/'
      })
    })
  })
});

export const { useGetPublicPostsQuery } = publicApi;
