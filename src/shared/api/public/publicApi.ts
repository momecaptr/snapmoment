import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import {
  GetPostByIdArgs,
  GetPostByIdResponse,
  GetPostCommentsByPostIdResponse,
  GetPostsArgs,
  GetPostsResponse,
  GetPublicPostsUserArgs,
  GetPublicUserProfileResponse,
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
    getPublicPostsUser: builder.query<GetPostsResponse, GetPublicPostsUserArgs>({
      query: ({ endCursorPostId, pageSize, userId }) => ({
        params: {
          pageSize,
          sortBy: 'createdAt',
          sortDirection: 'desc'
        },
        url: `v1/public-posts/user/${userId}/${endCursorPostId}`
      })
    }),

    getPublicUserProfile: builder.query<GetPublicUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => `v1/public-user/profile/${profileId}`
    }),
    getTotalUsersCount: builder.query<GetTotalUsersCountProps, void>({
      query: () => ({
        url: 'v1/public-user'
      })
    })
  })
});

export const { getPostById, getPublicPosts, getPublicPostsUser, getPublicUserProfile } = publicApi.endpoints;

export const {
  useGetPostCommentsByPostIdQuery,
  useGetPublicPostsQuery,
  useGetTotalUsersCountQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostCommentsByPostIdQuery
} = publicApi;
