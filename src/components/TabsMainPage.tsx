import React, { FC, useEffect, useState } from 'react';
import { Button, Stack, styled } from '@mui/material';
import { blue, blueGrey, indigo } from '@mui/material/colors';
import EditableText from '~compos/EditableText';
import { uuidv4 } from '~utils/uuidv4';
import { useAlert } from '~utils/userHooks';
import { ITab, ITabsMainPage } from '~interfaces/interfaces';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ClearIcon from '@mui/icons-material/Clear';
import useTranslation from '~utils/localization';

const TabButton = styled('div')({
  borderRadius: '10px',
  display: 'flex',
  height: '40px',
  padding: '3px 10px',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all',
  transitionDuration: '300ms',
  cursor: 'pointer',
});

const InnerButton = styled('button')({
  marginLeft: '10px',
  border: 'none',
  backgroundColor: 'inherit',
  fontSize: '18px',
  width: '15px',
  height: '15px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const TabsMainPage: FC<ITabsMainPage> = ({
  query,
  setQuery,
  response,
  setResponse,
  variables,
  setVariables,
}) => {
  const localization = useTranslation();

  const showMsg = useAlert();
  const [tabs, setTabs] = useState<ITab[]>([
    {
      id: uuidv4(),
      title: localization.main.tabsText,
      query: query,
      response: response,
      variables: variables,
      active: true,
    },
  ]);

  const addTab = () => {
    if (tabs.length > 4) {
      showMsg({ type: 'info', content: localization.main.tabsMaxLimits });
      return;
    }
    if (tabs) {
      const tab: ITab = {
        id: uuidv4(),
        title: localization.main.tabsText,
        query: '',
        response: '',
        variables: '',
        active: false,
      };
      setTabs((prevState) => {
        return prevState.concat(tab);
      });
      setTabs((prevState) => {
        return prevState.map((t) =>
          t.id === tab.id ? { ...t, active: true } : { ...t, active: false }
        );
      });
      setQuery('');
      setResponse('');
      setVariables('');
    }
  };

  useEffect(() => {
    setTabs((prevState) => {
      return prevState.map((t) => (t.active ? { ...t, query, response, variables } : { ...t }));
    });
  }, [query, response, variables]);

  const setActiveButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tab: ITab) => {
    e.stopPropagation();
    setQuery(tab.query);
    setResponse(tab.response);
    setVariables(tab.variables);

    setTabs((prevState) => {
      return prevState.map((t) =>
        t.id === tab.id ? { ...t, active: true } : { ...t, active: false }
      );
    });
  };

  const deleteTab = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tab: ITab) => {
    e.stopPropagation();

    if (tabs.length < 2) {
      showMsg({ type: 'error', content: localization.main.tabsMinLimits });
      return;
    }

    const index = tabs.findIndex((t) => t.id === tab.id);

    let newTab: ITab;

    if (tab.active) {
      if (index === 0 && tabs.length > 1) {
        setTabs((prevState) => {
          return prevState.map((t, i) =>
            i === index + 1 ? { ...t, active: true } : { ...t, active: false }
          );
        });
        newTab = tabs[index + 1];
      } else {
        setTabs((prevState) => {
          return prevState.map((t, i) =>
            i === index - 1 ? { ...t, active: true } : { ...t, active: false }
          );
        });

        newTab = tabs[index - 1];
      }

      setQuery(newTab.query);
      setResponse(newTab.response);
      setVariables(newTab.variables);
    }

    setTabs((prevState) => {
      return prevState.filter((el) => el.id !== tab.id);
    });
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        position="relative"
        style={{ marginBottom: '10px' }}
      >
        <Stack direction="row" justifyContent="start" width="50%" gap={1} position="relative">
          {tabs.map((t) => (
            <TabButton
              key={t.id}
              onClick={(e) => setActiveButton(e, t)}
              style={{
                backgroundColor: t.active ? indigo[700] : blueGrey[100],
                color: t.active ? blue[100] : blue[700],
              }}
            >
              <EditableText initText={t.title} active={t.active} />
              <InnerButton onClick={(e) => deleteTab(e, t)}>
                <ClearIcon htmlColor="#fff" />
              </InnerButton>
            </TabButton>
          ))}
        </Stack>
        <Button
          variant="contained"
          onClick={addTab}
          sx={{
            borderRadius: '8px',
            height: 40,
            minWidth: 40,
            padding: '0px',
            backgroundColor: '#40b389',
          }}
        >
          <LibraryAddIcon htmlColor="#fff" />
        </Button>
      </Stack>
    </div>
  );
};

export default TabsMainPage;
