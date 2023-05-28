import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '~utils/localization';

export const ErrorPage: React.FC = () => {
  const localization = useTranslation();

  return (
    <Box sx={{ minWidth: '100%' }}>
      <Typography variant="h5">&#123;</Typography>
      <Typography variant="h5">&nbsp;&quot;errors&quot;: [</Typography>
      <Typography variant="h5">&nbsp;&nbsp; &#123;</Typography>
      <Typography variant="h5">&nbsp;&nbsp;&nbsp;&quot;message&quot;:</Typography>
      <Typography
        sx={{ fontSize: { xs: '11rem', sm: '13rem' }, lineHeight: 1, textAlign: 'center' }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
        {localization.errorPage.noPage}
      </Typography>
      <Stack>
        <Typography variant="h5">&nbsp;&nbsp;&nbsp;&quot;solutions&quot;:</Typography>
        <Typography alignSelf={'center'}>
          [
          <Link to={'/'}>
            <Button variant="text" color="warning">
              &quot;{localization.errorPage.toMain}&quot;
            </Button>
          </Link>
          ]
        </Typography>
      </Stack>
      <Typography variant="h5">&nbsp;&nbsp; &#125;</Typography>
      <Typography variant="h5">&nbsp;]</Typography>
      <Typography variant="h5">&#125;</Typography>
    </Box>
  );
};
