import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { DefaultUi } from '~pages/DefaultUI';

const routerObject = createRoutesFromElements(
  <Route path="/" element={<DefaultUi />}>
    <Route index={true} element={<>Hello</>} />
  </Route>
);

export const router = createBrowserRouter(routerObject);
