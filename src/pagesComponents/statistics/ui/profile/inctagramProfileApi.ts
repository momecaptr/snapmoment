import { inctagramApi } from '@/myApp/api/inctagramApi';
import { GetUserProfile, UpdateUserProfileArgs } from '@/pagesComponents/statistics/ui/profile/profileTypes';

export const inctagramProfileApi = inctagramApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUserProfile: builder.query<GetUserProfile, void>({
        providesTags: ['UserProfile'],
        query: () => 'v1/users/profile'
      }),
      updateUserProfile: builder.mutation<any, UpdateUserProfileArgs>({
        invalidatesTags: ['UserProfile'],
        query: (body) => {
          return {
            body,
            method: 'PUT',
            url: '/v1/users/profile'
          };
        }
      })
    };
  }
});

export const { useGetUserProfileQuery, useLazyGetUserProfileQuery, useUpdateUserProfileMutation } = inctagramProfileApi;
