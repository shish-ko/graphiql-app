import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button variant="contained" sx={{ mr: 1 }} onClick={() => navigate('/auth')}>
        Sign up
      </Button>
      <Button variant="outlined" onClick={() => navigate('/registration')}>
        Log in
      </Button>
    </Box>
  );
};
