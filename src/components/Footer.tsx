import { Box, Container, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import github from '../assets/github-logo.svg';
import rslogo from '../assets/rs-logo.svg';

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        height: '15%',
        p: 2,
        boxShadow: '0px -4px 6px 0px rgba(34, 60, 80, 0.2)',
        backgroundColor: '#333',
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Stack direction="row" spacing={2} alignItems="center">
          <img src={github} alt="github logo" style={{ maxWidth: '30px' }} />
          <Link href="https://github.com/Hanna-Mamedova" target="_blank" rel="noreferrer">
            Hanna Mamedova
          </Link>
          <Link href="https://github.com/shish-ko/" target="_blank" rel="noreferrer">
            shish-ko
          </Link>
          <Link href="https://github.com/webjsmaster" target="_blank" rel="noreferrer">
            webjsmaster
          </Link>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <a href="https://rs.school/" target="_blank" rel="noreferrer">
            <img src={rslogo} alt="rs school logo" style={{ width: '60px' }} />
          </a>
          <Typography>2023 &copy;</Typography>
        </Stack>
      </Container>
    </Box>
  );
};