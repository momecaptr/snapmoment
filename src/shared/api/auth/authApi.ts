import { GoogleOAuthQuery, QueryError, RegistrationConfirmationQuery, RegistrationType } from '@/shared/api';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

export const authApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    confirmRegistration: builder.mutation<void, RegistrationConfirmationQuery>({
      query: (data) => {
        console.log({ data: data });

        return {
          body: data,
          method: 'POST',
          url: 'v1/auth/registration-confirmation'
        };
      }
    }),
    // googleOAuth: builder.mutation<AuthMeGoogleResponse, {code: string}>({
    googleOAuth: builder.mutation<void, GoogleOAuthQuery>({
      query: (code) => ({
        body: code,
        method: 'POST',
        url: 'v1/auth/google/login'
      })
    }),
    registration: builder.mutation<void, RegistrationType>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration'
      }),
      transformErrorResponse: (res: { data: QueryError; status: number }) => {
        return res.data;
      }
    })
  })
});

export const { useConfirmRegistrationMutation, useGoogleOAuthMutation, useRegistrationMutation } = authApi;
