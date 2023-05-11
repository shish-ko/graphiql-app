import { Box, Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box>
      <Button
        variant={pathname !== '/login' ? 'contained' : 'outlined'}
        sx={{ mr: 1 }}
        onClick={() => navigate('/signup')}
      >
        Sign up
      </Button>
      <Button
        variant={pathname !== '/login' ? 'outlined' : 'contained'}
        onClick={() => navigate('/login')}
      >
        Log in
      </Button>
    </Box>
  );
};
