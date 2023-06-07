import { Box, Container, Link, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import github from '../assets/github-logo.svg';
import rslogo from '../assets/rs-logo.svg';
import { GitHubIcon } from './GithubIcon';

enum DevelopersGithub {
  anderew = 'shish-ko',
  yuri = 'webjsmaster',
  hanna = 'Hanna Mamedova',
}

export const Footer: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      sx={{
        height: '15%',
        p: 2,
        boxShadow: '0px -4px 6px 0px rgba(34, 60, 80, 0.2)',
        backgroundColor: '#333',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '5px',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {!isSmallScreen && <img src={github} alt="github logo" style={{ maxWidth: '30px' }} />}
          <Link href="https://github.com/shish-ko/" target="_blank" rel="noreferrer">
            {isSmallScreen ? <GitHubIcon color="#fafafa" /> : DevelopersGithub.anderew}
          </Link>
          <Link href="https://github.com/webjsmaster" target="_blank" rel="noreferrer">
            {isSmallScreen ? <GitHubIcon color="rgb(175, 175, 175)" /> : DevelopersGithub.yuri}
          </Link>
          <Link href="https://github.com/Hanna-Mamedova" target="_blank" rel="noreferrer">
            {isSmallScreen ? <GitHubIcon color="#e535ab" /> : DevelopersGithub.hanna}
          </Link>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <a href="https://rs.school/" target="_blank" rel="noreferrer">
            <img src={rslogo} alt="rs school logo" style={{ width: '60px' }} />
          </a>
          <Typography color="primary">2023 &copy;</Typography>
        </Stack>
      </Container>
    </Box>
  );
};
