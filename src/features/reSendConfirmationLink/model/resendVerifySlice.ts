import { SignUpSchemaType } from '@/shared/schemas';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Omit<SignUpSchemaType, 'agreementPolicyStatus' | 'confirmPassword'> = {
  email: '',
  password: '',
  username: ''
};

export const slice = createSlice({
  initialState,
  name: 'resendVerifyLinkSlice',
  reducers: {
    setRegistrationData: (state, action: PayloadAction<SignUpSchemaType>) => {
      let stateCopy = { ...state };

      stateCopy = action.payload;

      return stateCopy;
    }
  },
  selectors: {
    getRegistrationData: (state) => state
  }
});

export const { setRegistrationData } = slice.actions;
export const { getRegistrationData } = slice.selectors;
export const resendVerifyLinkSlice = slice.reducer;
