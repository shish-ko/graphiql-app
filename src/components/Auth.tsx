import { Button, Stack, useMediaQuery } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StackDirection } from '~interfaces/interfaces';
import { BurgerMenu } from './BurgerMenu';

export const Auth: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 680px)');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuLinks = [
    {
      text: 'Sign up',
      onClick: () => navigate('/signup'),
    },
    {
      text: 'Log in',
      onClick: () => navigate('/login'),
    },
  ];

  return (
    <Stack direction={StackDirection.row} useFlexGap spacing={{ xs: 1, sm: 4 }}>
      {!isSmallScreen && (
        <Button
          variant={pathname !== '/login' ? 'contained' : 'outlined'}
          sx={{ minWidth: 'fit-content' }}
          onClick={() => navigate('/signup')}
        >
          Sign up
        </Button>
      )}
      {!isSmallScreen && (
        <Button
          variant={pathname !== '/login' ? 'outlined' : 'contained'}
          onClick={() => navigate('/login')}
          sx={{ minWidth: 'fit-content' }}
        >
          Log in
        </Button>
      )}
      {isSmallScreen && <BurgerMenu items={menuLinks} />}
    </Stack>
  );
};
