import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { authState } from '~configs/firebase';

export const ProtectedRoutes: React.FC = () => {
  const [user] = useAuthState(authState);

  return user ? <Outlet /> : <Navigate to={'/'} />;
};
