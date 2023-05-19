import { useState } from 'react';
import { Box, Stack, Typography, styled } from '@mui/material';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';

const Slide = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  transform: `translateY(${theme.spacing(12.5)})`,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(0)',
  },
}));

export const SlideBox = ({ passVariables }: { passVariables: (data: string) => void }) => {
  const [variables, setVariables] = useState('');

  const handleClick = (val: string) => {
    setVariables(val);
    passVariables(variables);
  };

  return (
    <>
      <Slide>
        <Stack sx={{ borderTop: '1px solid #282c34', p: 1 }} direction="row" gap={1}>
          <Typography component="div" variant="codeTitle">
            VARIABLES
          </Typography>
          <Typography component="div" variant="codeTitle">
            HEADERS
          </Typography>
        </Stack>
        <CodeMirror
          height="100px"
          extensions={[graphql()]}
          theme={githubLight}
          value={variables}
          onChange={(val) => handleClick(val)}
        />
      </Slide>
    </>
  );
};
