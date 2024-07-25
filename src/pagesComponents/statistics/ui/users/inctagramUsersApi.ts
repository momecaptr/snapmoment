import { inctagramApi } from '@/myApp/api/inctagramApi';
import { GetUsersResponse } from '@/pagesComponents/statistics/ui/users/userTypes';

export const inctagramUsersApi = inctagramApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUsers: builder.query<GetUsersResponse, void>({ query: () => 'v1/users' })
    };
  }
});

export const { useGetUsersQuery } = inctagramUsersApi;
