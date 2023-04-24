/*
 * File: ProtectedRoutes.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:08:52 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from 'src/contexts';

import CircularLoader from '../components/shared/Loader/CircularLoader';
import { Shell } from '../layouts';

import { RoutePaths } from './route-paths.enum';

const ProtectedRoutes: FC = () => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <CircularLoader />;
  }

  return isAuthenticated ? (
    <Shell />
  ) : (
    <Navigate to={RoutePaths.Login} state={{ path: location.pathname }} replace={true} />
  );
};

export default ProtectedRoutes;
