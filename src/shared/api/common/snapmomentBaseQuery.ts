import { RefreshTokenResponseSchema } from '@/shared/schemas/refreshTokenSchema';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = (typeof window !== 'undefined' && localStorage.getItem('accessToken')) || null;

    if (headers.get('Authorization')) {
      return headers;
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  try {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result?.meta?.response?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          if (localStorage.getItem('accessToken')) {
            const refreshResult = (await baseQuery(
              {
                method: 'POST',
                url: 'v1/auth/update-tokens'
              },
              api,
              extraOptions
            )) as any;

            const refreshResultParsed = RefreshTokenResponseSchema.parse(refreshResult.data);

            if (refreshResult.meta.response.status === 200) {
              localStorage.setItem('accessToken', refreshResult.data.accessToken);
              result = await baseQuery(args, api, extraOptions);
            }
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
  } catch (e) {
    return {
      error: {
        error: String(e),
        status: 'FETCH_ERROR'
      }
    };
  }
};
