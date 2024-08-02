import { Avatar } from '@/shared/api';

export interface GetUserProfileResponse {
  aboutMe: string;
  avatars: Avatar[];
  city: string;
  country: string;
  createdAt?: string;
  dateOfBirth: string;
  firstName: string;
  id: number;
  lastName: string;
  userName: string;
}
export interface UpdateUserProfileArgs {
  aboutMe: string;
  city: string;
  country: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  userName: string;
}
