import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { alertSlice } from './alertSlice';
import { userSlice } from './userSlice';

const appReducers = combineReducers({
  user: userSlice.reducer,
  alert: alertSlice.reducer,
});

export const store = configureStore({
  reducer: appReducers,
});
