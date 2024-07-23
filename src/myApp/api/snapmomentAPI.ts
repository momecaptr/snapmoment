import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const snapmomentAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1',
    credentials: 'include'
    //   Надо??? Есть такая настройка?
    //   prepareHeaders: headers => {
    //     headers.append('x-auth-skip', 'true')
    //   }
  }),
  endpoints: (builder) => {
    return {
      // googleOAuth: builder.mutation<AuthMeGoogleResponse, {code: string}>({
      googleOAuth: builder.mutation<void, { code: string }>({
        query: (code) => ({
          body: code,
          method: 'POST',
          url: '/auth/google/login'
        })
      })
    };
  },
  reducerPath: 'snapmomentAPI'
});

export const { useGoogleOAuthMutation } = snapmomentAPI;
