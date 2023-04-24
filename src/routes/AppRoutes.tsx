/*
 * File: AppRoutes.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:08:41 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from 'src/components/auth/Login/Login';

import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';

import ProtectedRoutes from './ProtectedRoutes';
import { RoutePaths } from './route-paths.enum';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={RoutePaths.Login} element={<Login />} />
      <Route path={RoutePaths.Root} element={<ProtectedRoutes />}>
        <Route index element={<Home />} />
      </Route>
      <Route path={RoutePaths.WildRoute} element={<PageNotFound />} />
    </>,
  ),
);

// App Routes
const AppRoutes: FC = () => {
  return <RouterProvider router={appRouter} />;
};

export default AppRoutes;
