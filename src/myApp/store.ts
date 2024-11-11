import { notificationSlice } from '@/entities/userNotifications/api/notificationSlice';
import { createPostSlice } from '@/features/createPost/service/createPostSlice';
import { appSlice } from '@/myApp/model/appSlice';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(snapmomentAPI.middleware),
    reducer: {
      app: appSlice.reducer,
      createPost: createPostSlice,
      notifications: notificationSlice,
      [snapmomentAPI.reducerPath]: snapmomentAPI.reducer
    }
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
