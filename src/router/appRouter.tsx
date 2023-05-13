import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { DefaultUi } from '~pages/DefaultUI/DefaultUI';
import AuthPage from '~pages/Auth/AuthPage';
import { Welcome } from '~pages/Welcome/Welcome';
import { PrivateRoutes, PublicRoutes } from './ProtectedRoutes';
import { MainPage } from '~pages/MainPage/MainPage';

const routerObject = createRoutesFromElements(
  <Route path="/" element={<DefaultUi />}>
    <Route index={true} element={<Welcome />} />
    <Route element={<PrivateRoutes />}>
      <Route path="/main" element={<MainPage />} />
    </Route>
    <Route element={<PublicRoutes />}>
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routerObject);
