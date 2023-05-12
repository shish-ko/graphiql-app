import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '~compos/Footer';
import { Header } from '~compos/Header';
import { useAppSelector } from '~utils/userHooks';

export const DefaultUi: React.FC = () => {
  const { name } = useAppSelector((state) => state.user);

  return (
    <>
      <Header />
      <Container sx={{ flexGrow: 1, py: 5 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
