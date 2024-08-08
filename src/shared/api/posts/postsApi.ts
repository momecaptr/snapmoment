import {
  GetAnswersWithPaginationArgs,
  GetAnswersWithPaginationResponse,
  GetPostLikesArgs,
  GetPostLikesResponse,
  UpdateLikePostArgs
} from '@/shared/api/';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

export const postsApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAnswersWithPagination: builder.query<GetAnswersWithPaginationResponse, GetAnswersWithPaginationArgs>({
      query: ({ commentId, postId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers`
      })
    }),

    getPostLikes: builder.query<GetPostLikesResponse, GetPostLikesArgs>({
      providesTags: ['publicPostLikes'],
      query: ({ postId }) => ({
        url: `v1/posts/${postId}/likes`
      })
    }),
    updateLikePost: builder.mutation<void, UpdateLikePostArgs>({
      invalidatesTags: ['publicPost', 'publicPostLikes'],

      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `v1/posts/${postId}/like-status`
      })
    })
  })
});

export const { useGetAnswersWithPaginationQuery, useLazyGetPostLikesQuery, useUpdateLikePostMutation } = postsApi;
