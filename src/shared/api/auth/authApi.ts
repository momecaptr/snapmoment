import {
  BaseResponseType,
  GoogleOAuthQuery,
  LoginQuery,
  RecoveryPasswordResponse,
  RegistrationType
} from '@/shared/api';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

export const authApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    confirmRegistration: builder.mutation<void, { confirmationCode: string }>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration-confirmation'
      }),
      transformErrorResponse: (res: { data: any; status: number }) => {
        return res.data;
      }
    }),
    googleOAuth: builder.mutation<void, GoogleOAuthQuery>({
      query: (code) => ({
        body: code,
        method: 'POST',
        url: 'v1/auth/google/login'
      })
    }),
    login: builder.mutation<{ accessToken: string }, LoginQuery>({
      invalidatesTags: ['Me'],
      query: (data) => {
        return {
          body: data,
          method: 'POST',
          url: 'v1/auth/login'
        };
      }
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'v1/auth/logout'
      })
    }),
    me: builder.query<void, void>({
      providesTags: ['Me'],
      query: () => ({
        method: 'GET',
        url: 'v1/auth/me'
      })
    }),
    passwordRecovery: builder.mutation<void, RecoveryPasswordResponse>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'v1/auth/password-recovery'
      })
    }),
    registration: builder.mutation<BaseResponseType | void, RegistrationType>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration'
      }),
      transformErrorResponse: (res: { data: BaseResponseType; status: number }) => {
        return res.data;
      }
    })
  })
});

export const {
  useConfirmRegistrationMutation,
  useGoogleOAuthMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useRegistrationMutation
} = authApi;
