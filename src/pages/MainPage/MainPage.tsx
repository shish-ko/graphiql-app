import { Box, Button, Stack, styled, useMediaQuery } from '@mui/material';
import React, { lazy, Suspense, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useQuery } from '~utils/userHooks';
import { SideButton } from '~compos/UI_components';
import { GraphQLSchema } from 'graphql';
import { githubLight } from '@uiw/codemirror-theme-github';
import { SlideBox } from './SlideBox';
import TabsMainPage from '~compos/TabsMainPage';
import useTranslation from '~utils/localization';

const Borders = styled(Box)(() => ({
  padding: '10px',
  borderRadius: '12px',
  backgroundColor: '#FFFF',
  boxShadow:
    '0px 6px 20px rgba(59, 76, 106, .13), 0px 1.34018px 4.46726px rgba(59, 76, 106, .0774939), 0px .399006px 1.33002px rgba(59, 76, 106, .0525061)',
}));

const Documentation = lazy(() => import('../../components/Documentation'));

export const MainPage: React.FC = () => {
  const localization = useTranslation();
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

  return (
    <>
      <Suspense
        fallback={
          <SideButton color="warning" variant="contained">
            {localization.main.apiLoading}
          </SideButton>
        }
      >
        <Documentation schemaSetter={setSchema} />
      </Suspense>
      <Borders
        sx={{
          flex: 1,
          backgroundColor: '#f1f2f4',
          maxWidth: '100%',
        }}
      >
        <TabsMainPage
          query={query}
          setQuery={setQuery}
          response={response}
          setResponse={setResponse}
          variables={variables}
          setVariables={setVariables}
        />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          width="100%"
          minHeight="calc(100% - 50px)"
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
                  placeholder={schema ? localization.main.queryWait : localization.main.shemaWait}
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
              <SlideBox setValue={setVariables} value={variables} />
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
