export interface AuthMeGoogleResponse {
  accessToken: string;
  email: string;
}

export interface RegistrationType {
  baseUrl?: string;
  email: string;
  password: string;
  userName: string;
}

export interface LoginQuery extends Omit<RegistrationType, 'baseUrl' | 'userName'> {}

export interface GoogleOAuthQuery {
  code: string;
}

export interface RegistrationConfirmationQuery {
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

export type RecoveryPasswordResponse = {
  baseUrl?: string;
  email: string;
  recaptcha: string;
};

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
