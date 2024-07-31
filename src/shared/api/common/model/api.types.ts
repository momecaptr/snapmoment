export interface GoogleOAuthResponse {
  accessToken: string;
  email: string;
}

export interface RegistrationArgs {
  baseUrl?: string;
  email: string;
  password: string;
  userName: string;
}

export interface LoginArgs extends Omit<RegistrationArgs, 'baseUrl' | 'userName'> {}

export interface LoginResponse {
  accessToken: string;
}

export interface GoogleOAuthArgs {
  code: string;
}

export interface CheckRecoveryCodeResponse {
  email: string;
}

export interface CheckRecoveryCodeArgs {
  recoveryCode: string;
}

export interface RegistrationConfirmationArgs {
  confirmationCode: string;
}

export interface BaseResponseType {
  error: string;
  messages: Message[];
  statusCode: number;
}

export interface Message {
  field: string;
  message: string;
}

export interface ResendEmailArgs {
  baseUrl: string;
  email: string;
}

export type RecoveryPasswordArgs = {
  baseUrl?: string;
  email: string;
  recaptcha: string;
};

export interface CreateNewPasswordArgs {
  newPassword: string;
  recoveryCode: string;
}

export interface MeResponse {
  email: string;
  isBlocked: boolean;
  userId: number;
  userName: string;
}

export interface GetPostsArgs {
  pageSize: number;
}

export interface GetPostsResponse {
  items: Item[];
  pageSize: number;
  totalCount: number;
  totalUsers: number;
}

export interface Item {
  avatarOwner: string;
  createdAt: string;
  description: string;
  id: number;
  images: Image[];
  isLiked: boolean;
  likesCount: number;
  location: string;
  owner: Owner;
  ownerId: number;
  updatedAt: string;
  userName: string;
}

export interface Owner {
  firstName: string;
  lastName: string;
}

export interface Image {
  createdAt: string;
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
}

export interface GetUserProfileResponse {
  aboutMe: string;
  avatars: Avatar[];
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  firstName: string;
  id: number;
  lastName: string;
  userName: string;
}

export interface Avatar {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
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
