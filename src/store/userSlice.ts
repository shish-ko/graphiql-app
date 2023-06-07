import { createSlice } from '@reduxjs/toolkit';
import { IUserSlice } from '~interfaces/interfaces';

const initialState: IUserSlice = {
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogin = true;
    },
    logOut: (state) => {
      state.isLogin = false;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
