import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { DefaultUi } from '~pages/DefaultUI/DefaultUI';
import AuthPage from '~pages/Auth/AuthPage';
import { Welcome } from '~pages/Welcome/Welcome';
import { PrivateRoutes, PublicRoutes } from './ProtectedRoutes';
import { MainPage } from '~pages/MainPage/MainPage';
import { ErrorPage } from '~pages/Error/ErrorPage';
import { schemaFetcher } from '~utils/docParser';

const routerObject = createRoutesFromElements(
  <Route path="/" element={<DefaultUi />}>
    <Route index={true} element={<Welcome />} />
    <Route element={<PrivateRoutes />}>
      <Route path="/main" element={<MainPage />} loader={schemaFetcher} />
    </Route>
    <Route element={<PublicRoutes />}>
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Route>
);

export const router = createBrowserRouter(routerObject);
