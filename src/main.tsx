import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.scss';
import { router } from './router/appRouter';
import { Provider } from 'react-redux';
import { store } from './store/reduxStore';
import { ThemeProvider } from '@mui/material';
import { appTheme } from './theme/Theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
