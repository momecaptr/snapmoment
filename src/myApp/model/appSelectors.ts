import { RootState } from '@/myApp/store';

export const selectTheme = (state: RootState) => state.app.theme;
export const selectApp = (state: RootState) => state.app;
export const selectIsOpen = (state: RootState) => state.app.modal.isOpen;
export const selectModalKey = (state: RootState) => state.app.modal.modalKey;

export const selectIsPhotoInState = (state: RootState) => state.app.isPhotoInState;
