import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h5">&#123;</Typography>
        <Typography variant="h5">&nbsp;&quot;errors&quot;: [</Typography>
        <Typography variant="h5">&nbsp;&nbsp; &#123;</Typography>
        <Typography variant="h5">&nbsp;&nbsp;&nbsp;&quot;message&quot;:</Typography>
        <Typography sx={{ fontSize: '13rem', lineHeight: 1, textAlign: 'center' }}>404</Typography>
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
          Sorry, the page you are looking for doesn&apos;t exist
        </Typography>
        <Stack>
          <Typography variant="h5">&nbsp;&nbsp;&nbsp;&quot;solutions&quot;:</Typography>
          <Typography alignSelf={'center'}>
            [
            <Link to={'/'}>
              <Button variant="text" color="warning">
                &quot;go to the main page&quot;
              </Button>
            </Link>
            ]
          </Typography>
        </Stack>
        <Typography variant="h5">&nbsp;&nbsp; &#125;</Typography>
        <Typography variant="h5">&nbsp;]</Typography>
        <Typography variant="h5">&#125;</Typography>
      </Box>
    </>
  );
};
