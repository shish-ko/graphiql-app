import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { authState } from '~configs/firebase';
import { useAlert } from '~utils/userHooks';
import { BurgerMenu } from './BurgerMenu';
import { Stack } from '@mui/system';

export const AuthLoggedIn: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 680px)');
  const [user] = useAuthState(authState);
  const [signOut, loading, error] = useSignOut(authState);
  const showMsg = useAlert();
  const navigate = useNavigate();

  const signOutHandler = async () => {
    const result = await signOut();
    if (error) {
      showMsg({ type: 'error', content: error.message });
    }
    if (result) {
      showMsg({ type: 'info', content: 'Logged out successfully!' });
    }
  };

  const menuLink = [
    {
      text: 'Log out',
      onClick: () => signOutHandler(),
    },
  ];

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Typography component={'span'} sx={{ color: grey[50] }}>
        {user?.email}
      </Typography>
      {!isSmallScreen && (
        <Button variant="contained" sx={{ ml: 1 }} onClick={signOutHandler} disabled={loading}>
          Log out
        </Button>
      )}
      {isSmallScreen && <BurgerMenu items={menuLink} />}
    </Stack>
  );
};
