import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppAlert } from '~compos/AppAlert';
import { Footer } from '~compos/Footer';
import { Header } from '~compos/Header';

export const DefaultUi: React.FC = () => {
  return (
    <>
      <Header />
      <Container sx={{ flexGrow: 1, py: 5 }}>
        <Outlet />
      </Container>
      <Footer />
      <AppAlert />
    </>
  );
};
