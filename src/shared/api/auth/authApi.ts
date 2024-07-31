import {
  BaseResponseType,
  CheckRecoveryCodeArgs,
  CheckRecoveryCodeResponse,
  CreateNewPasswordArgs,
  GoogleOAuthArgs,
  GoogleOAuthResponse,
  LoginArgs,
  LoginResponse,
  MeResponse,
  RecoveryPasswordArgs,
  RegistrationArgs,
  RegistrationConfirmationArgs,
  ResendEmailArgs
} from '@/shared/api';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import { transformErrorResponse } from '@/shared/api/lib/transformErrorResponse';

export const authApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    checkRecoveryCode: builder.mutation<CheckRecoveryCodeResponse, CheckRecoveryCodeArgs>({
      query: (recoveryCode) => ({
        body: recoveryCode,
        method: 'POST',
        url: 'v1/auth/check-recovery-code'
      })
    }),
    confirmRegistration: builder.mutation<void, RegistrationConfirmationArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration-confirmation'
      }),
      transformErrorResponse
    }),
    createNewPassword: builder.mutation<void, CreateNewPasswordArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/new-password'
      })
    }),
    googleOAuth: builder.mutation<GoogleOAuthResponse, GoogleOAuthArgs>({
      invalidatesTags: ['Me'],
      query: (code) => ({
        body: code,
        method: 'POST',
        url: 'v1/auth/google/login'
      })
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem('accessToken');
        dispatch(authApi.util.resetApiState());
      },
      query: (body) => ({
        body,
        method: 'POST',
        url: 'v1/auth/logout'
      })
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        method: 'GET',
        url: 'v1/auth/me'
      })
    }),
    passwordRecovery: builder.mutation<void, RecoveryPasswordArgs>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'v1/auth/password-recovery'
      })
    }),
    registration: builder.mutation<BaseResponseType | void, RegistrationArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration'
      }),
      transformErrorResponse
    }),
    resendEmail: builder.mutation<void, ResendEmailArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration-email-resending'
      }),
      transformErrorResponse
    })
  })
});

export const {
  useCheckRecoveryCodeMutation,
  useConfirmRegistrationMutation,
  useCreateNewPasswordMutation,
  useGoogleOAuthMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useRegistrationMutation,
  useResendEmailMutation
} = authApi;
