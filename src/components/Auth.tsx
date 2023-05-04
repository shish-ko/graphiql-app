import { Box, Button, Container } from '@mui/material';
import React from 'react';

export const Auth: React.FC = () => {
  return (
    <Box>
      <Button variant="contained" sx={{ mr: 1 }}>
        Sign up
      </Button>
      <Button variant="outlined">Log in</Button>
    </Box>
  );
};
