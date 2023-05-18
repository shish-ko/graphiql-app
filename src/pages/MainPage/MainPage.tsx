import { Box, Button, Stack, styled, Typography } from '@mui/material';
import React, { Suspense, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useQuery } from '~utils/userHooks';
import { Documentation } from '~compos/Documentation';
import { Await, useLoaderData } from 'react-router-dom';
import { Schema } from '~interfaces/doc_interfaces';
import { SideButton } from '~compos/UI_components';

const Item = styled(Box)({
  flexBasis: '48%',
  border: '1px solid',
  maxWidth: '48%',
  position: 'relative',
  overflow: 'hidden',
});

const SlideBox = styled(Box)(({ theme }) => ({
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

export const MainPage: React.FC = () => {
  const defered = useLoaderData() as { data: Schema };
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [response, setResponse] = useState('');
  const fetcher = useQuery();

  const sendQuery = () => {
    fetcher(setResponse, query, variables);
  };

  return (
    <>
      <Suspense
        fallback={
          <SideButton color="warning" variant="contained">
            API documentation is loading ...
          </SideButton>
        }
      >
        <Await resolve={defered.data}>{(schema) => <Documentation schema={schema} />}</Await>
      </Suspense>
      <Stack direction="row" justifyContent="space-between" width="100%" position="relative">
        <Item>
          <CodeMirror
            height="500px"
            extensions={[graphql()]}
            value={query}
            onChange={(val) => setQuery(val)}
            placeholder="# Write your query or mutation here"
          />
          <SlideBox>
            <Stack sx={{ backgroundColor: '#282c34', p: 1 }} direction="row" gap={1}>
              <Typography component="div" variant="codeTitle">
                variables
              </Typography>
              <Typography component="div" variant="codeTitle">
                headers
              </Typography>
            </Stack>
            <CodeMirror
              height="100px"
              extensions={[graphql()]}
              theme="dark"
              value={variables}
              onChange={(val) => setVariables(val)}
            />
          </SlideBox>
        </Item>
        <Button
          variant="contained"
          onClick={sendQuery}
          startIcon={<PlayCircleIcon />}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99,
          }}
        >
          Run
        </Button>
        <Item>
          <CodeMirror height="500px" theme="light" value={response} />
        </Item>
      </Stack>
    </>
  );
};
