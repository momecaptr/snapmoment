import { RefreshTokenResponseSchema } from '@/shared/schemas/refreshTokenSchema';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import Router from 'next/router';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/',
  // credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');

    console.log({ token });
    if (headers.get('Authorization')) {
      return headers;
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    // headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  try {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          // const refreshToken = localStorage.getItem('refreshToken');
          const refreshResult = await baseQuery(
            {
              // headers: {
              //   Authorization: `Bearer ${refreshToken}`
              // },
              // ! Из-за того, что refreshToken лежит в cookie, а не в localStorage, Добавляем credentials include
              credentials: 'include',
              method: 'POST',
              url: 'v1/auth/update-tokens'
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const refreshResultParsed = RefreshTokenResponseSchema.parse(refreshResult.data);

            localStorage.setItem('accessToken', refreshResultParsed.accessToken);
            // localStorage.setItem('refreshToken', refreshResultParsed.refreshToken);
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.log('loggedOut');
            Router.push('/sign-in');
            // ! Это из карточек
            // /*!Исправили*/
            // const isPublicRoute = publicRoutes.find(route =>
            //   matchPath(route.path ?? '', window.location.pathname)
            // )
            //
            // if (!isPublicRoute) {
            //   void router.navigate('/login')
            // }
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  } catch (e) {
    return {
      error: {
        error: String(e),
        status: 'FETCH_ERROR'
      }
    };
  }
};
