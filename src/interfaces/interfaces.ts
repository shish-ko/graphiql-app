import { store } from '../store/reduxStore';

export interface IUserSlice {
  name: string;
}

export type storeState = ReturnType<typeof store.getState>;
export type storeDispatch = typeof store.dispatch;

export interface IFormData {
  email: string;
  password: string;
}
