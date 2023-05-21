import { CircularProgress, Container } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router-dom';
import { AppAlert } from '~compos/AppAlert';
import { Footer } from '~compos/Footer';
import { Header } from '~compos/Header';
import { authState } from '~configs/firebase';

export const DefaultUi: React.FC = () => {
  const [user, loading] = useAuthState(authState);

  if (loading)
    return (
      <CircularProgress
        color="inherit"
        size={80}
        sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
    );

  return (
    <>
      <Header />
      <Container sx={{ flexGrow: 1, py: 5, display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </Container>
      <Footer />
      <AppAlert />
    </>
  );
};
