import { Box, Button, Stack, styled } from '@mui/material';
import React, { Suspense, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useQuery } from '~utils/userHooks';
import { Documentation } from '~compos/Documentation';
import { Await, useLoaderData } from 'react-router-dom';
import { SideButton } from '~compos/UI_components';
import { GraphQLSchema, IntrospectionQuery } from 'graphql';
import { githubLight } from '@uiw/codemirror-theme-github';
import { SlideBox } from './SlideBox';

const Item = styled(Box)({
  flexBasis: '49%',
  border: '1px solid',
  borderRadius: '5px',
  maxWidth: '49%',
  position: 'relative',
  overflow: 'hidden',
});

export const MainPage: React.FC = () => {
  const defered = useLoaderData() as { data: IntrospectionQuery };
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [response, setResponse] = useState('');
  const [schema, setSchema] = useState<GraphQLSchema>();
  const fetcher = useQuery();

  const sendQuery = () => {
    fetcher(setResponse, query, variables);
  };

  const getVariables = (data: string) => {
    setVariables(data);
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
        <Await resolve={defered.data}>
          {(schema: IntrospectionQuery) => (
            <Documentation schema={schema} schemaSetter={setSchema} />
          )}
        </Await>
      </Suspense>
      <Stack direction="row" justifyContent="space-between" width="100%" position="relative">
        <Item>
          <CodeMirror
            height="500px"
            extensions={[graphql(schema)]}
            value={query}
            theme={githubLight}
            onChange={(val) => setQuery(val)}
            placeholder={schema ? '# Write your query or mutation here' : 'Wait for schema...'}
          />
          <SlideBox passVariables={getVariables} />
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
            borderRadius: '50%',
            height: '70px',
          }}
        >
          Run
        </Button>
        <Item>
          <CodeMirror theme={githubLight} value={response} />
        </Item>
      </Stack>
    </>
  );
};
