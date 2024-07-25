import { alertSlice } from '@/entities/alert/model/alertSlice';
import { resendVerifyLinkSlice } from '@/features/reSendConfirmationLink/model/resendVerifySlice';
import { appSlice } from '@/myApp/model/appSlice';
import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(snapmomentAPI.middleware),
    reducer: {
      alertSlice,
      app: appSlice.reducer,
      resendVerifyLinkSlice,
      [snapmomentAPI.reducerPath]: snapmomentAPI.reducer
    }
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
