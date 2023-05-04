import { Box, Container } from '@mui/material';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        height: '15%',
        p: 2,
        boxShadow: '0px -4px 6px 0px rgba(34, 60, 80, 0.2)',
      }}
    >
      <Container>Footer</Container>
    </Box>
  );
};
