import { AppSettings, Theme } from '@/app/model/appTypes';
import { ModalKey } from '@/shared/utils/hooks/useModal';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AppSettings = {
  modal: {
    isOpen: false,
    modalKey: null
  },
  theme: (typeof window !== 'undefined' && (localStorage.getItem('theme') as Theme)) || 'moon'
};

export const appSlice = createSlice({
  initialState: initialState,
  name: 'app',
  reducers: {
    setTheme: (state, action: PayloadAction<{ theme: Theme }>) => {
      state.theme = action.payload.theme;
    },
    toggleModal: (state, action: PayloadAction<{ key: ModalKey; open: boolean }>) => {
      state.modal.isOpen = action.payload.open;
      state.modal.modalKey = action.payload.open ? action.payload.key : null;
    }
  }
});

export const { setTheme, toggleModal } = appSlice.actions;

export default appSlice.reducer;
