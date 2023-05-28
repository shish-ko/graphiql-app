import React, { useState } from 'react';
import { AppBar, Box, Container, styled, Typography, useMediaQuery } from '@mui/material';
import { Auth } from './Auth';
import { Logo } from './Logo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authState } from '~configs/firebase';
import { AuthLoggedIn } from './AuthLoggedIn';
import LangSwitcher from './LangSwitcher';
import Stack from '@mui/system/Stack';

interface ElevationScrollProps {
  children: React.ReactElement;
}

export const HeaderWrapper = styled(Box)({
  padding: 16,
  boxShadow: '0px 8px 6px 0px rgba(34, 60, 80, 0.2)',
  transition: 'background-color 0.5s ease-out',
  top: 0,
});

const ElevationScroll = (props: ElevationScrollProps) => {
  const { children } = props;
  const [trigger, setTrigger] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setTrigger(position > 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? '#444' : '#333',
      transition: 'background-color 0.5s ease-out',
    },
  });
};

export const Header: React.FC = () => {
  const [user] = useAuthState(authState);
  const isSmallScreen = useMediaQuery('(max-width: 680px)');

  return (
    <ElevationScroll>
      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <HeaderWrapper>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              gap: '10px',
              flexWrap: 'nowrap',
            }}
          >
            <Logo />
            {!isSmallScreen && <Typography variant="title">Graphql playground</Typography>}
            <Stack direction="row" gap={4} alignItems="center">
              <LangSwitcher />
              {user ? <AuthLoggedIn /> : <Auth />}
            </Stack>
          </Container>
        </HeaderWrapper>
      </AppBar>
    </ElevationScroll>
  );
};
