import { AnswerItems, UserFollowingFollowersProps } from '@/shared/api/public/publicTypes';

export type GetAnswersWithPaginationArgs = {
  commentId: number;
  pageNumber?: number;
  pageSize?: number;
  postId: number;
  sortBy?: string;
  sortDirection?: string;
};
export type GetAnswersWithPaginationResponse = {
  items?: AnswerItems[];
  pageSize: number;
  totalCount: number;
};

export type GetPostLikesArgs = {
  cursor?: number;
  pageNumber?: number;
  pageSize?: number;
  postId: null | number;
  search?: string;
};
export type GetPostLikesResponse = {
  items?: UserFollowingFollowersProps[];
  pageSize: number;
  totalCount: number;
};

export type UpdateLikePostArgs = {
  likeStatus: LikeStatusProps;
  postId: number;
};
export type LikeStatusProps = 'DISLIKE' | 'LIKE' | 'NONE';
