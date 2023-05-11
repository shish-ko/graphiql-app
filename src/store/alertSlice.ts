import { createSlice } from '@reduxjs/toolkit';
import { IAlertSlice } from '~interfaces/*';

const initialState: IAlertSlice = {
  type: 'success',
  content: '',
  isShown: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    invokeAlert: (state, { payload }: { payload: Omit<IAlertSlice, 'isShown'> }) => {
      state.type = payload.type;
      state.content = payload.content;
      state.isShown = true;
    },
    hideAlert: (state) => {
      state.isShown = false;
    },
  },
});

export const { invokeAlert, hideAlert } = alertSlice.actions;
