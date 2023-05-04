import React from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
import { Auth } from './Auth';

const HeaderWrapper = styled(Box)({
  padding: 16,
  boxShadow: '0px 8px 6px 0px rgba(34, 60, 80, 0.2)',
  position: 'sticky',
  top: 0,
});

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Typography>ToDo: Logo</Typography>
        <Typography variant="title">GraphiQL playground</Typography>
        <Auth />
      </Container>
    </HeaderWrapper>
  );
};
