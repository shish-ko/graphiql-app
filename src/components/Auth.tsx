import { Button, Stack } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StackDirection } from '~interfaces/*';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Stack direction={StackDirection.row} useFlexGap spacing={{ xs: 1, sm: 4 }}>
      <Button
        variant={pathname !== '/login' ? 'contained' : 'outlined'}
        sx={{ minWidth: 'fit-content' }}
        onClick={() => navigate('/signup')}
      >
        Sign up
      </Button>
      <Button
        variant={pathname !== '/login' ? 'outlined' : 'contained'}
        onClick={() => navigate('/login')}
        sx={{ minWidth: 'fit-content' }}
      >
        Log in
      </Button>
    </Stack>
  );
};
