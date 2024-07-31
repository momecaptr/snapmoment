import {
  BaseResponseType,
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
    confirmRegistration: builder.mutation<void, RegistrationConfirmationArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration-confirmation'
      }),
      transformErrorResponse
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;

        localStorage.setItem('accessToken', res.data.accessToken);
        dispatch(authApi.util.invalidateTags(['Me']));

        // ! можно редирект тут делать или там где логиним пользователя
        // Router.push('/profile')
      },
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
  useConfirmRegistrationMutation,
  useGoogleOAuthMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useRegistrationMutation,
  useResendEmailMutation
} = authApi;
