import { alertSlice } from '@/components/ui/alert/model/alertSlice';
import { appSlice } from '@/lib/features/app/model/appSlice';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      alertSlice,
      app: appSlice.reducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
