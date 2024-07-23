import { GoogleOAuthQuery, QueryError, RegistrationConfirmationQuery, RegistrationType } from '@/myApp/api/api.types';
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
  endpoints: (builder) => ({
    confirmRegistration: builder.mutation<void, RegistrationConfirmationQuery>({
      query: (data) => {
        console.log({ data: data });

        return {
          body: data,
          method: 'POST',
          url: '/auth/registration-confirmation'
        };
      }
    }),
    // googleOAuth: builder.mutation<AuthMeGoogleResponse, {code: string}>({
    googleOAuth: builder.mutation<void, GoogleOAuthQuery>({
      query: (code) => ({
        body: code,
        method: 'POST',
        url: '/auth/google/login'
      })
    }),
    registration: builder.mutation<void, RegistrationType>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '/auth/registration'
      }),
      transformErrorResponse: (res: { data: QueryError; status: number }) => {
        return res.data;
      }
    })
  }),
  reducerPath: 'snapmomentAPI'
});

export const { useConfirmRegistrationMutation, useGoogleOAuthMutation, useRegistrationMutation } = snapmomentAPI;
