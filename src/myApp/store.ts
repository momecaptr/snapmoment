import { alertSlice } from '@/entities/alert/model/alertSlice';
import { appSlice } from '@/myApp/model/appSlice';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      alertSlice,
      app: appSlice.reducer
    }
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
