import { RootState } from '@/myApp/store';
import { baseQueryWithReauth } from '@/shared/api/common/snapmomentBaseQuery';
import { PayloadAction } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

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
  tagTypes: ['Me', 'UserProfile', 'publicPost', 'publicPostLikes']
});

export const { getRunningQueriesThunk } = snapmomentAPI.util;
