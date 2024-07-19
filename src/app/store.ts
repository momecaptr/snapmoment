import { appSlice } from '@/app/model/appSlice';
import { alertSlice } from '@/entities/alert/model/alertSlice';
import { configureStore } from '@reduxjs/toolkit';

// export const store = () => {
//   return configureStore({
//     reducer: {
//       alertSlice,
//       app: appSlice.reducer
//     }
//   });
// };
//
// // Infer the type of store
// export type AppStore = ReturnType<typeof store>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    alertSlice,
    app: appSlice.reducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
