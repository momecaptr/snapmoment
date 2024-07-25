export interface GetPostsResponse {
  items: Item[];
  pageSize: number;
  totalCount: number;
  totalUsers: number;
}

export interface GetPostsArgs {
  pageSize: number;
}

interface Image {
  createdAt: string;
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
}
interface Owner {
  firstName?: string;
  lastName?: string;
}
interface Item {
  avatarOwner?: string;
  createdAt: string;
  description: string;
  id: number;
  images: Image[];
  isLiked: boolean;
  likesCount: number;
  location?: any;
  owner: Owner;
  ownerId: number;
  updatedAt: string;
  userName: string;
}
