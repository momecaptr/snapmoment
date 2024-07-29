import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import Router from 'next/router';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api', // Укажите ваш базовый URL
  prepareHeaders: (headers) => {
    const token = typeof window !== 'undefined' && localStorage.getItem('accessToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

export const inctagramFetchBaseQuery: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = (await baseQuery(
          {
            credentials: 'include',
            method: 'POST',
            url: 'v1/auth/update-tokens'
          },
          api,
          extraOptions
        )) as any;

        if (refreshResult.data) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken);

          result = await baseQuery(args, api, extraOptions);
        } else {
          Router.push('/sign-in');
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
