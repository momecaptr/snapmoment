import { GetPostsResponse } from '@/myApp/api/inctagramTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api' }),
  endpoints: (builder) => ({
    getPublicPosts: builder.query<GetPostsResponse, void>({
      query: () => {
        return {
          params: {
            sortBy: 'createdAt',
            sortDirection: 'desc'
          },
          url: '/v1/public-posts/all'
        };
      }
    }),
    googleOAuth2: builder.mutation<void, { code: string }>({
      query: (code) => {
        console.log(code);

        return {
          body: code,
          method: 'POST',
          url: '/v1/auth/google/login'
        };
      }
    })
  }),
  reducerPath: 'inctagramApi'
});

export const { useGetPublicPostsQuery, useGoogleOAuth2Mutation } = inctagramApi;
