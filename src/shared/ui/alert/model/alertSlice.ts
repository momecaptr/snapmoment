import { AlertFnProps, AlertProps, AlertState } from '@/shared/ui/alert/types/types';
import { PayloadAction, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

const slice = createAppSlice({
  initialState: {
    alerts: []
  } as AlertState,
  name: 'alertSlice',
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: any }>();

    return {
      addAlert: creators.reducer((state, action: PayloadAction<AlertProps>) => {
        state.alerts.push(action.payload);
      }),

      addErrorAlert: createAThunk<void, AlertFnProps>(async ({ autoClose = 3000, message }, { dispatch }) => {
        const id = new Date().getTime().toString();

        dispatch(slice.actions.addAlert({ id, message, type: 'error' }));

        setTimeout(() => {
          dispatch(slice.actions.removeAlert({ id }));
        }, autoClose);
      }),
      addSuccessAlert: createAThunk<void, AlertFnProps>(async ({ autoClose = 3000, message }, { dispatch }) => {
        const id = new Date().getTime().toString();

        dispatch(slice.actions.addAlert({ id, message, type: 'success' }));

        setTimeout(() => {
          dispatch(slice.actions.removeAlert({ id }));
        }, autoClose);
      }),
      removeAlert: creators.reducer((state, action: PayloadAction<{ id: string }>) => {
        state.alerts = state.alerts.filter((alert) => alert.id !== action.payload.id);
      })
    };
  },
  selectors: {
    selectAlerts: (state: AlertState) => state.alerts
  }
});

export const alertSlice = slice.reducer;
export const AlertActions = slice.actions;
export const alertSelectors = slice.selectors;
