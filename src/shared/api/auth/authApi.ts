import {
  BaseResponseType,
  GoogleOAuthArgs,
  LoginArgs,
  LoginResponse,
  RecoveryPasswordResponse,
  RegistrationArgs,
  RegistrationConfirmationArgs,
  ResendEmailArgs
} from '@/shared/api';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

export const authApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    confirmRegistration: builder.mutation<void, RegistrationConfirmationArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration-confirmation'
      }),
      transformErrorResponse: (res: { data: any; status: number }) => {
        return res.data;
      }
    }),
    googleOAuth: builder.mutation<void, GoogleOAuthArgs>({
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
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // await queryFulfilled
        // localStorage.removeItem('accessToken')
        // dispatch(authApi.util.resetApiState())
        const res = dispatch(
          authApi.util.updateQueryData('me', undefined, () => {
            return null;
          })
        );

        try {
          console.log('successQueryFulfilled');
          try {
            const rr = await queryFulfilled;

            console.log({ rr });
          } catch {
            console.log('successQueryFulfilled FAILED');
          }
        } catch {
          console.log('failedQueryFulfilled');
          res.undo();
        } finally {
          // localStorage.removeItem('accessToken')
        }
      },
      query: (body) => ({
        body,
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
    registration: builder.mutation<BaseResponseType | void, RegistrationArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration'
      }),
      transformErrorResponse: (res: { data: BaseResponseType; status: number }) => {
        return res.data;
      }
    }),
    resendEmail: builder.mutation<void, ResendEmailArgs>({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'v1/auth/registration-email-resending'
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
  useRegistrationMutation,
  useResendEmailMutation
} = authApi;
