import { Button, Stack, useMediaQuery } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BurgerMenu } from './BurgerMenu';
import useTranslation from '~utils/localization';

export const Auth: React.FC = () => {
  const localization = useTranslation();

  const isSmallScreen = useMediaQuery('(max-width: 680px)');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuLinks = [
    {
      text: localization.auth.signup,
      onClick: () => navigate('/signup'),
    },
    {
      text: localization.auth.login,
      onClick: () => navigate('/login'),
    },
  ];

  return (
    <Stack direction={'row'} useFlexGap spacing={{ xs: 1, sm: 4 }}>
      {!isSmallScreen && (
        <Button
          variant={pathname !== '/login' ? 'contained' : 'outlined'}
          sx={{ minWidth: 'fit-content' }}
          onClick={() => navigate('/signup')}
        >
          {localization.auth.signup}
        </Button>
      )}
      {!isSmallScreen && (
        <Button
          variant={pathname !== '/login' ? 'outlined' : 'contained'}
          onClick={() => navigate('/login')}
          sx={{ minWidth: 'fit-content' }}
        >
          {localization.auth.login}
        </Button>
      )}
      {isSmallScreen && <BurgerMenu items={menuLinks} />}
    </Stack>
  );
};
