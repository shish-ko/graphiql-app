import { Avatar, Button, useMediaQuery } from '@mui/material';
import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { authState } from '~configs/firebase';
import { useAlert } from '~utils/userHooks';
import { BurgerMenu } from './BurgerMenu';
import { Stack } from '@mui/system';
import useTranslation from '~utils/localization';

export const AuthLoggedIn: React.FC = () => {
  const localization = useTranslation();

  const isSmallScreen = useMediaQuery('(max-width: 680px)');
  const [user] = useAuthState(authState);
  const [signOut, loading, error] = useSignOut(authState);
  const showMsg = useAlert();

  const signOutHandler = async () => {
    const result = await signOut();
    if (error) {
      showMsg({ type: 'error', content: error.message });
    }
    if (result) {
      showMsg({ type: 'info', content: localization.auth.logoutSuccess });
    }
  };

  const menuLink = [
    {
      text: localization.auth.logout,
      onClick: () => signOutHandler(),
    },
  ];

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Avatar sx={{ textTransform: 'capitalize', background: '#7c4b4b' }}>
        {user?.email?.slice(0, 2)}
      </Avatar>
      {!isSmallScreen && (
        <Button variant="contained" sx={{ ml: 1 }} onClick={signOutHandler} disabled={loading}>
          {localization.auth.logout}
        </Button>
      )}
      {isSmallScreen && <BurgerMenu items={menuLink} />}
    </Stack>
  );
};
