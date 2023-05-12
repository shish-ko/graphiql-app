import React, { useState } from 'react';
import { AppBar, Box, Container, styled, Typography } from '@mui/material';
import { Auth } from './Auth';
import { Logo } from './Logo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authState } from '~configs/firebase';
import { User } from './User';

interface ElevationScrollProps {
  children: React.ReactElement;
}

const HeaderWrapper = styled(Box)({
  padding: 16,
  boxShadow: '0px 8px 6px 0px rgba(34, 60, 80, 0.2)',
  transition: 'background-color 0.5s ease-out',
  top: 0,
});

function ElevationScroll(props: ElevationScrollProps) {
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
}

export const Header: React.FC = () => {
  const [user] = useAuthState(authState);
  return (
    <ElevationScroll>
      <AppBar position="sticky">
        <HeaderWrapper>
          <Container
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'center', md: 'space-between' },
              alignItems: 'end',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <Logo />
            <Typography variant="title">GraphiQL playground</Typography>
            {user ? <User /> : <Auth />}
          </Container>
        </HeaderWrapper>
      </AppBar>
    </ElevationScroll>
  );
};
