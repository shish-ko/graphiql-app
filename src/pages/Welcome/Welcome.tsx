import React from 'react';
import { Info } from './components/Info';
import { Stack } from '@mui/material';
import { StackDirection } from '~interfaces/*';
import { Rss } from './components/Rss';
import { About } from './components/about/About';
import { TeamInfo } from './components/TeamInfo';

export const Welcome: React.FC = () => {
  return (
    <Stack
      direction={StackDirection.column}
      justifyContent="center"
      useFlexGap
      spacing={{ xs: 4, sm: 10 }}
    >
      <About />
      <Info />
      <Rss />
      <TeamInfo />
    </Stack>
  );
};
