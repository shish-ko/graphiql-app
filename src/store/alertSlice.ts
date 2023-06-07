import { createSlice } from '@reduxjs/toolkit';
import { IAlertPayload, IAlertSlice } from '~interfaces/interfaces';

const initialState: IAlertSlice = {
  type: 'success',
  content: '',
  isShown: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    invokeAlert: (state, { payload }: { payload: IAlertPayload }) => {
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
