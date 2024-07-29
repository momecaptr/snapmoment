import { Image } from '@/pagesComponents/statistics/ui/posts/postsTypes';

export interface GetUserProfile {
  aboutMe?: string;
  avatars?: Image[];
  city?: string;
  country?: string;
  dateOfBirth?: string;
  firstName?: string;
  id: string;
  lastName?: string;
  userName: string;
}

export interface UpdateUserProfileArgs {
  aboutMe?: string;
  avatars?: Image[];
  city?: string;
  country?: string;
  dateOfBirth?: string;
  firstName: string;
  lastName: string;
  userName: string;
}
