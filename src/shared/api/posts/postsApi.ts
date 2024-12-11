import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import {
  DeleteUsersImagePostArgs,
  DeleteUsersPostArgs,
  GetAnswersWithPaginationArgs,
  GetAnswersWithPaginationResponse,
  GetPostLikesArgs,
  GetPostLikesResponse,
  GetPostsByUserNameArgs,
  GetPostsByUserNameResponse,
  UpdateLikePostArgs,
  UpdateUserPostArgs
} from '@/shared/api/posts/postsTypes';

export const postsApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    deleteUsersImagePost: builder.mutation<void, DeleteUsersImagePostArgs>({
      invalidatesTags: ['PostsByUserName', 'publicPost', 'UserProfile'],
      query: ({ uploadId }) => ({
        method: 'DELETE',
        url: `v1/posts/image/${uploadId}`
      })
    }),
    deleteUsersPost: builder.mutation<void, DeleteUsersPostArgs>({
      invalidatesTags: ['PostsByUserName', 'publicPost', 'UserProfile'],
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `v1/posts/${postId}`
      })
    }),

    getAnswersWithPagination: builder.query<GetAnswersWithPaginationResponse, GetAnswersWithPaginationArgs>({
      query: ({ commentId, postId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers`
      })
    }),
    getPostLikes: builder.query<GetPostLikesResponse, GetPostLikesArgs>({
      // providesTags: (result) =>
      //   result && result.items
      //     ? [
      //         ...result.items.map((item) => ({ id: item.id, type: 'publicPostLikes' as const })),
      //         { id: 'LIST', type: 'publicPostLikes' }
      //       ]
      //     : [{ id: 'LIST', type: 'publicPostLikes' }],
      providesTags: ['publicPostLikes'],
      query: ({ postId }) => ({
        url: `v1/posts/${postId}/likes`
      })
    }),
    getPostsByUserName: builder.query<GetPostsByUserNameResponse, GetPostsByUserNameArgs>({
      providesTags: ['PostsByUserName'],
      query: (args) => {
        const { pageNumber, pageSize, sortBy, sortDirection, userName } = args;

        return {
          method: 'GET',
          params: {
            ...args,
            pageNumber: pageNumber || 1,
            pageSize: pageSize || 10,
            sortBy: sortBy || undefined,
            sortDirection: sortDirection || undefined
          },
          url: `v1/posts/${userName}`
        };
      }
    }),
    updateLikePost: builder.mutation<void, UpdateLikePostArgs>({
      // invalidatesTags: ['publicPost', { id: 'LIST', type: 'publicPostLikes' }],
      invalidatesTags: ['publicPost', 'publicPostLikes'],

      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `v1/posts/${postId}/like-status`
      })
    }),
    updateUsersPost: builder.mutation<void, UpdateUserPostArgs>({
      invalidatesTags: ['PostsByUserName', 'publicPost', 'UserProfile', 'PublicPosts'],
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `v1/posts/${postId}`
      })
    })
  })
});

export const {
  useDeleteUsersImagePostMutation,
  useDeleteUsersPostMutation,
  useGetAnswersWithPaginationQuery,
  useGetPostLikesQuery,
  useGetPostsByUserNameQuery,
  useUpdateLikePostMutation,
  useUpdateUsersPostMutation
} = postsApi;
