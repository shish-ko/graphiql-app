import { AlertColor } from '@mui/material';
import { store } from '../store/reduxStore';

export interface IUserSlice {
  isLogin: boolean;
}

export interface IAlertSlice {
  content: string;
  type: AlertColor;
  isShown: boolean;
}

export type IAlertPayload = Omit<IAlertSlice, 'isShown'>;

export type storeState = ReturnType<typeof store.getState>;
export type storeDispatch = typeof store.dispatch;

export interface IFormData {
  email: string;
  password: string;
}

export interface IOfType {
  kind: string;
  name?: string | null;
  ofType?: IOfType | null;
}
