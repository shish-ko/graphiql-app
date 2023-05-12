import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { DefaultUi } from '~pages/DefaultUI/DefaultUI';
import AuthPage from '~pages/Auth/AuthPage';
import { Welcome } from '~pages/Welcome/Welcome';
import { PrivateRoutes, PublicRoutes } from './ProtectedRoutes';

const routerObject = createRoutesFromElements(
  <Route path="/" element={<DefaultUi />}>
    <Route index={true} element={<Welcome />} />
    <Route index={true} element={<>Content</>} />
    <Route element={<PrivateRoutes />}>
      <Route path="/main" element={<>Main page</>} />
    </Route>
    <Route element={<PublicRoutes />}>
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routerObject);
