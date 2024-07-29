import { inctagramFetchBaseQuery } from '@/myApp/api/inctagramFetchBaseQuery';
import { LoginArgs, LoginResponse } from '@/pagesComponents/signIn/api/inctagramTypes';
import { createApi } from '@reduxjs/toolkit/query/react';

export const inctagramApi = createApi({
  baseQuery: inctagramFetchBaseQuery,
  endpoints: (builder) => ({
    googleOAuth2: builder.mutation<void, { code: string }>({
      query: (code) => {
        return {
          body: code,
          method: 'POST',
          url: '/v1/auth/google/login'
        };
      }
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Login'],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (!data) {
          return;
        }

        typeof window !== 'undefined' && localStorage.setItem('accessToken', data.accessToken);
      },
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/login'
      })
    }),
    logout: builder.mutation({
      async onQueryStarted(_, { queryFulfilled }) {
        typeof window !== 'undefined' && localStorage.removeItem('accessToken');
      },
      query: () => ({
        method: 'POST',
        url: 'v1/auth/logout'
      })
    })
  }),
  reducerPath: 'inctagramApi',
  tagTypes: ['UserProfile', 'Login']
});

export const { useGoogleOAuth2Mutation, useLoginMutation, useLogoutMutation } = inctagramApi;
