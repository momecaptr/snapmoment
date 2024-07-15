import { RootState } from '@/app/store';

export const selectTheme = (state: RootState) => state.app.theme;
export const selectApp = (state: RootState) => state.app;
export const selectIsOpen = (state: RootState) => state.app.modal.isOpen;
export const selectModalKey = (state: RootState) => state.app.modal.modalKey;
