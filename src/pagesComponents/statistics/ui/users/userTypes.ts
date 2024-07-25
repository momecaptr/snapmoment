interface Item {
  avatars: any[];
  createdAt: string;
  firstName?: any;
  id: number;
  lastName?: any;
  userName: string;
}
export interface GetUsersResponse {
  items: Item[];
  nextCursor: number;
  page: number;
  pageSize: number;
  pagesCount: number;
  prevCursor: number;
  totalCount: number;
}

export interface GetUsersArgs {
  pageSize: number;
}
