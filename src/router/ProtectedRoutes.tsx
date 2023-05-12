import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { authState } from '~configs/firebase';

export const PrivateRoutes: React.FC = () => {
  const [user] = useAuthState(authState);

  return user ? <Outlet /> : <Navigate to={'/'} />;
};

export const PublicRoutes: React.FC = () => {
  const [user] = useAuthState(authState);

  return user ? <Navigate to={'/'} /> : <Outlet />;
};
