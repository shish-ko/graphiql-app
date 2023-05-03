import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { userSlice } from './userSlice';

const appReducers = combineReducers({
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: appReducers,
});
