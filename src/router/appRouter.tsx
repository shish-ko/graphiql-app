import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { DefaultUi } from '~pages/DefaultUI/DefaultUI';

const routerObject = createRoutesFromElements(
  <Route path="/" element={<DefaultUi />}>
    <Route index={true} element={<>{'<h1>1</h1>'.repeat(10000)}</>} />
  </Route>
);

export const router = createBrowserRouter(routerObject);
