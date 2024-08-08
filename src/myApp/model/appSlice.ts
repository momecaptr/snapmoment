import { AppSettings, Theme } from '@/myApp/model/appTypes';
import { ModalKey } from '@/shared/lib';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AppSettings = {
  isPhotoInState: false,
  modal: {
    isOpen: false,
    modalKey: []
  },
  theme: (typeof window !== 'undefined' && (localStorage.getItem('theme') as Theme)) || 'moon'
};

export const appSlice = createSlice({
  initialState: initialState,
  name: 'app',
  reducers: {
    closeAllModals: (state, action: PayloadAction<{ key: ModalKey; open: boolean }>) => {
      state.modal.modalKey = [];
    },
    isPhotoInState: (state, action: PayloadAction<boolean>) => {
      state.isPhotoInState = action.payload;
      console.log(state.isPhotoInState);
    },
    setTheme: (state, action: PayloadAction<{ theme: Theme }>) => {
      state.theme = action.payload.theme;
    },
    toggleModal: (state, action: PayloadAction<{ key: ModalKey; open: boolean }>) => {
      state.modal.isOpen = action.payload.open;
      if (action.payload.open) {
        state.modal.modalKey.push(action.payload.key);
      } else {
        const index = state.modal.modalKey.indexOf(action.payload.key);

        if (index !== -1) {
          state.modal.modalKey.splice(index, 1);
        }
        state.modal.isOpen = state.modal.modalKey.length > 0;
      }
    }
  }
});

export const { isPhotoInState, setTheme, toggleModal } = appSlice.actions;

export default appSlice.reducer;
