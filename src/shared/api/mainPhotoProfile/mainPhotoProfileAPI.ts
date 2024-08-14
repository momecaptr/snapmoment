import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import { GetUserProfilePhotoResponse } from '@/shared/api/mainPhotoProfile/mainPhotoTypes';

export const mainPhotoProfileApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    deleteMainPhotoProfile: builder.mutation<void, void>({
      invalidatesTags: ['MainPhotoProfile'],
      query: () => ({
        method: 'DELETE',
        url: '/v1/users/profile/avatar'
      })
    }),
    getUserProfilePhoto: builder.query<GetUserProfilePhotoResponse, void>({
      providesTags: ['MainPhotoProfile'],
      query: (data) => ({
        body: data,
        method: 'GET',
        url: 'v1/users/profile'
      })
    }),
    setMainPhotoProfile: builder.mutation<void, { data: File | null }>({
      invalidatesTags: ['MainPhotoProfile'],
      query: ({ data }) => {
        const formData = new FormData();

        if (data) {
          formData.append('file', data);
        }

        return {
          body: formData,
          method: 'POST',
          url: '/v1/users/profile/avatar'
        };
      }
    })
  })
});

export const { useDeleteMainPhotoProfileMutation, useGetUserProfilePhotoQuery, useSetMainPhotoProfileMutation } =
  mainPhotoProfileApi;
