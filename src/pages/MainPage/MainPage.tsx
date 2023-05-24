import { Box, Button, Stack, styled, useMediaQuery } from '@mui/material';
import React, { Suspense, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
  backgroundColor: '#FFFF',
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
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

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
      <Borders
        sx={{
          flex: 1,
          backgroundColor: '#f1f2f4',
          maxWidth: '100%',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          width="100%"
          minHeight="100%"
          gap={1}
        >
          <Borders
            sx={{
              resize: isSmallScreen ? '' : 'horizontal',
              overflow: 'auto',
              minWidth: isSmallScreen ? '100%' : '40%',
              maxWidth: isSmallScreen ? '100%' : '80%',
            }}
          >
            <Stack direction="column" height="100%">
              <Stack
                direction="row"
                gap={3}
                minHeight={isSmallScreen ? '100px' : ''}
                sx={{
                  flex: 1,
                }}
              >
                <CodeMirror
                  extensions={schema && [graphql(schema)]}
                  value={query}
                  theme={githubLight}
                  onChange={(val) => setQuery(val)}
                  placeholder={
                    schema ? '# Write your query or mutation here' : 'Wait for schema...'
                  }
                  style={{ flex: 1, overflow: 'auto' }}
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
                    <PlayArrowIcon htmlColor="#fff" />
                  </Button>
                </Box>
              </Stack>
              <SlideBox setValue={setVariables} />
            </Stack>
          </Borders>
          <Borders style={{ flex: 1, overflow: 'auto' }}>
            <CodeMirror theme={githubLight} value={response} />
          </Borders>
        </Stack>
      </Borders>
    </>
  );
};
