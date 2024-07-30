import { GetUserProfileResponse, UpdateUserProfileArgs } from '@/shared/api';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

export const profileApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      providesTags: ['UserProfile'],
      query: () => 'v1/users/profile'
    }),
    updateUserProfile: builder.mutation<any, UpdateUserProfileArgs>({
      invalidatesTags: ['UserProfile'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getUserProfile', undefined, (draft) => {
            Object.assign(draft, args);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      query: (data) => ({
        body: data,
        method: 'PUT',
        url: 'v1/users/profile'
      })
    })
  })
});

export const { useGetUserProfileQuery, useLazyGetUserProfileQuery, useUpdateUserProfileMutation } = profileApi;
