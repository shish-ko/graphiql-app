import React, { FC, useEffect, useState } from 'react';
import { Stack, styled, Tab } from '@mui/material';
import { blue, blueGrey, indigo } from '@mui/material/colors';
import EditableText from '~compos/EditableText';
import { uuidv4 } from '~utils/uuidv4';
import cross from './../assets/cross.png';
import { useAlert } from '~utils/userHooks';

const TabCss = styled(Tab)({
  '&.Mui-selected': {
    color: indigo[500],
    borderColor: indigo[500],
  },
});

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
});

interface ITab {
  id: string;
  query: string;
  response: string;
  variables: string;
  title: string;
  active: boolean;
}

interface ITabsMainPage {
  query: string;
  setQuery: (arg: string) => void;
  response: string;
  setResponse: (arg: string) => void;
  variables: string;
  setVariables: (arg: string) => void;
}

const TabsMainPage: FC<ITabsMainPage> = ({ query, setQuery, response, setResponse, variables, setVariables }) => {
  const showMsg = useAlert();
  const [tabs, setTabs] = useState<ITab[]>([
    {
      id: uuidv4(),
      title: 'New tab',
      query: query,
      response: response,
      variables: variables,
      active: true,
    },
  ]);


  const addTab = () => {
    if (tabs) {
      const tab: ITab = {
        id: uuidv4(),
        title: 'New tab',
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
      return prevState.map((t) => (t.active ? { ...t, query, response } : { ...t }));
    });
  }, [query, response]);

  const setActiveButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tab: ITab) => {
    e.stopPropagation();
    console.log( '⭐: ', tab )

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
      showMsg({ type: 'error', content: "You can't delete the last tab" });
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
  // console.log( '🌻:', variables )


  // console.log( '🆘: ', tabs )

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" width="100%" position="relative">
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
                <img src={cross} style={{ width: '100%', height: '100%' }} alt="cross" />
              </InnerButton>
            </TabButton>
          ))}
        </Stack>
        <TabCss onClick={addTab} style={{ fontSize: '24px' }} label={'+'} />
      </Stack>
    </div>
  );
};

export default TabsMainPage;
