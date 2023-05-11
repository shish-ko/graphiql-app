import { AlertColor } from '@mui/material';
import { store } from '../store/reduxStore';

export enum StackDirection {
  row = 'row',
  reverse = 'row-reverse',
  column = 'column',
}

export interface IUserSlice {
  name: string;
}

export interface IAlertSlice {
  content: string;
  type: AlertColor;
  isShown: boolean;
}

export type storeState = ReturnType<typeof store.getState>;
export type storeDispatch = typeof store.dispatch;

export interface IFormData {
  email: string;
  password: string;
}
