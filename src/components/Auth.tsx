import { Box, Button } from '@mui/material';
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
