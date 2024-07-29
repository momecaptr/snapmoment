import { inctagramApi } from '@/myApp/api/inctagramApi';
import { GetUserProfile, UpdateUserProfileArgs } from '@/pagesComponents/statistics/ui/profile/profileTypes';
import { toast } from 'sonner';

export const inctagramProfileApi = inctagramApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUserProfile: builder.query<GetUserProfile, void>({
        providesTags: ['UserProfile'],
        query: () => 'v1/users/profile'
      }),
      updateUserAvatar: builder.mutation<any, { file: File }>({
        query: ({ file }) => {
          const formData = new FormData();

          formData.append('file', file);

          return {
            body: formData,
            method: 'POST',
            url: '/v1/users/profile/avatar'
          };
        }
      }),
      updateUserProfile: builder.mutation<any, UpdateUserProfileArgs>({
        invalidatesTags: ['UserProfile'],
        async onQueryStarted({ ...args }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            inctagramProfileApi.util.updateQueryData('getUserProfile', undefined, (draft) => {
              Object.assign(draft, args);
            })
          );

          try {
            await queryFulfilled;
            toast.success('User profile updated successfully.');
          } catch (error) {
            patchResult.undo();
            if (error instanceof Error) {
              toast.error(error.message);
            } else if (error && typeof error === 'object' && 'error' in error) {
              const fetchBaseQueryError = error as { error: { data?: { messages?: { message: string }[] } } };

              toast.error(
                fetchBaseQueryError.error.data?.messages?.map((m) => m.message).join(', ') ?? 'Something went wrong.'
              );
            } else {
              toast.error('Something went wrong.');
            }
          }
        },
        query: (body) => {
          return {
            body,
            method: 'PUT',
            url: 'v1/users/profile'
          };
        }
      })
    };
  }
});

export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation
} = inctagramProfileApi;
