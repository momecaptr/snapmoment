import type { Action, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/myApp/store';
import { baseQueryWithReauth } from '@/shared/api/common/snapmomentBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const snapmomentAPI = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [
    'Me',
    'UserProfile',
    'MainPhotoProfile',
    'PersonalInformation',
    'publicPost',
    'publicPostLikes',
    'PostsByUserName',
    'Payment',
    'Device',
    'Notifications'
  ]
});

export const { getRunningQueriesThunk } = snapmomentAPI.util;
