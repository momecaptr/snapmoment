import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc1OSwiaWF0IjoxNzIxODk4NTM2LCJleHAiOjE3MjE5MDIxMzZ9.H6oCt8-r-Zihi1iWuLzWI8oSIvqjkwgNqUMmmVfxYeM';

export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api',
    prepareHeaders: (headers) => headers.set('Authorization', `Bearer ${token}`)
  }),
  endpoints: (builder) => ({
    googleOAuth2: builder.mutation<void, { code: string }>({
      query: (code) => {
        return {
          body: code,
          method: 'POST',
          url: '/v1/auth/google/login'
        };
      }
    })
  }),
  reducerPath: 'inctagramApi',
  tagTypes: ['UserProfile']
});

export const { useGoogleOAuth2Mutation } = inctagramApi;
