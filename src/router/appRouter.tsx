import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { DefaultUi } from '~pages/DefaultUI/DefaultUI';
import AuthPage from '~pages/Auth/AuthPage';
import { Welcome } from '~pages/Welcome/Welcome';

const routerObject = createRoutesFromElements(
  <Route path="/" element={<DefaultUi />}>
    <Route index={true} element={<Welcome />} />
    <Route path="/signup" element={<AuthPage />} />
    <Route path="/login" element={<AuthPage />} />
  </Route>
);

export const router = createBrowserRouter(routerObject);
