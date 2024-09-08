import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import {
  GetPostByIdArgs,
  GetPostByIdResponse,
  GetPostCommentsByPostIdResponse,
  GetPostsArgs,
  GetPostsResponse,
  GetTotalUsersCountProps,
  getPostCommentsByPostIdArgs
} from '@/shared/api/public/publicTypes';

export const publicApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query<GetPostByIdResponse, GetPostByIdArgs>({
      providesTags: ['publicPost'],
      query: ({ postId }) => ({
        url: `v1/public-posts/${postId}`
      })
    }),

    getPostCommentsByPostId: builder.query<GetPostCommentsByPostIdResponse, getPostCommentsByPostIdArgs>({
      query: ({ postId }) => ({
        url: `v1/public-posts/${postId}/comments`
      })
    }),

    getPublicPosts: builder.query<GetPostsResponse, GetPostsArgs>({
      query: ({ pageSize }) => ({
        params: {
          pageSize,
          sortBy: 'createdAt',
          sortDirection: 'desc'
        },
        url: 'v1/public-posts/all/'
      })
    }),
    getTotalUsersCount: builder.query<GetTotalUsersCountProps, void>({
      query: () => ({
        url: 'v1/public-user'
      })
    })
  })
});

export const {
  useGetPublicPostsQuery,
  useGetTotalUsersCountQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostCommentsByPostIdQuery,
  useLazyGetPublicPostsQuery
} = publicApi;
