import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { authState } from '~configs/firebase';
import { useAlert } from '~utils/userHooks';

export const User: React.FC = () => {
  const [user] = useAuthState(authState);
  const [signOut, loading, error] = useSignOut(authState);
  const showMsg = useAlert();

  const signOutHandler = async () => {
    const result = await signOut();
    if (error) {
      showMsg({ type: 'error', content: error.message });
    }
    if (result) {
      showMsg({ type: 'info', content: 'Logged out successfully!' });
    }
  };

  return (
    <Box>
      <Typography>{user?.email}</Typography>
      <Button variant="contained" sx={{ ml: 1 }} onClick={signOutHandler} disabled={loading}>
        Log out
      </Button>
    </Box>
  );
};
