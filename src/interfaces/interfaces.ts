import { AlertColor } from '@mui/material';
import { store } from '../store/reduxStore';
import React from 'react';

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

export interface ITab {
  id: string;
  query: string;
  response: string;
  variables: string;
  title: string;
  active: boolean;
}

export interface ITabsMainPage {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  response: string;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  variables: string;
  setVariables: React.Dispatch<React.SetStateAction<string>>;
}

export interface IEditableInput {
  initText: string;
  active: boolean;
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
}
