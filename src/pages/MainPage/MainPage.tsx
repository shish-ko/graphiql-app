import { Box, Button, IconButton, Stack, styled } from '@mui/material';
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

const Borders = styled(Box)(() => ({
  padding: '10px',
  borderRadius: '12px',
  boxShadow:
    '0px 6px 20px rgba(59, 76, 106, .13), 0px 1.34018px 4.46726px rgba(59, 76, 106, .0774939), 0px .399006px 1.33002px rgba(59, 76, 106, .0525061)',
}));

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
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Borders
          sx={{
            resize: 'horizontal',
            overflow: 'auto',
            minWidth: '40%',
          }}
        >
          <Stack direction="column">
            <Stack direction="row" gap={3}>
              <CodeMirror
                height="500px"
                extensions={[graphql(schema)]}
                value={query}
                theme={githubLight}
                onChange={(val) => setQuery(val)}
                placeholder={schema ? '# Write your query or mutation here' : 'Wait for schema...'}
                style={{ flex: 1 }}
              />
              <Box>
                <Button
                  variant="contained"
                  onClick={sendQuery}
                  sx={{
                    borderRadius: '8px',
                    height: 40,
                    minWidth: 40,
                    padding: '0px',
                    backgroundColor: '#40b389',
                  }}
                >
                  <IconButton color="primary">
                    <PlayCircleIcon />
                  </IconButton>
                </Button>
              </Box>
            </Stack>
            <SlideBox passVariables={getVariables} />
          </Stack>
        </Borders>

        <CodeMirror theme={githubLight} value={response} />
      </Stack>
    </>
  );
};
