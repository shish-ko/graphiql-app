import { createSlice } from '@reduxjs/toolkit';
import { IUserSlice } from '~interfaces/*';

const initialState: IUserSlice = {
  name: 'ReduxUSerName',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, { payload }) => {
      state.name = payload;
    },
  },
});

export const { setUserName } = userSlice.actions;
