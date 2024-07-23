import { AuthMeGoogleResponse, CodeAuthMeGoogle } from '@/myApp/api/api.types';
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
      authMe: builder.mutation<AuthMeGoogleResponse, CodeAuthMeGoogle>({
        query: (code) => ({
          method: 'POST',
          params: code,
          url: '/auth/google/login'
        })
      })
    };
  },
  reducerPath: 'snapmomentAPI'
});

export const { useAuthMeMutation } = snapmomentAPI;
