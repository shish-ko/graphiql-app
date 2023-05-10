import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { DefaultUi } from '~pages/DefaultUI/DefaultUI';

const routerObject = createRoutesFromElements(
  <Route path="/" element={<DefaultUi />}>
    <Route index={true} element={<>Content</>} />
  </Route>
);

export const router = createBrowserRouter(routerObject);
