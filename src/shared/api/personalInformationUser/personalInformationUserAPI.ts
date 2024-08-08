import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import {
  GetPersonalInformationUserResponse,
  PersonalInformationArgs
} from '@/shared/api/personalInformationUser/personalInformationUserTypes';
export const personalInformationUserAPI = snapmomentAPI.injectEndpoints({
  endpoints: (build) => ({
    getPersonalInformationUser: build.query<GetPersonalInformationUserResponse, void>({
      query: () => ({
        method: 'GET',
        url: 'v1/users/profile'
      })
    }),
    setPersonalInformationUser: build.mutation<void, PersonalInformationArgs>({
      invalidatesTags: ['PersonalInformation'],
      query: (data) => ({
        body: data,
        method: 'PUT',

        url: '/v1/users/profile'
      })
    })
  })
});

export const {
  useGetPersonalInformationUserQuery,
  useLazyGetPersonalInformationUserQuery,
  useSetPersonalInformationUserMutation
} = personalInformationUserAPI;
