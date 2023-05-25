import React, { FC, useEffect, useState } from 'react';
import { Stack, styled, Tab } from '@mui/material';
import { blue, blueGrey, indigo } from '@mui/material/colors';
import EditableText from '~compos/EditableText';
import { uuidv4 } from '~utils/uuidv4';
import cross from './../assets/cross.png';

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
});

interface ITab {
  id: string;
  query: string;
  title: string;
  active: boolean;
}

interface ITabsMainPage {
  query: string;
  setQuery: () => void;
}

const TabsMainPage: FC<ITabsMainPage> = ({ query, setQuery }) => {
  const [tabs, setTabs] = useState<ITab[]>([
    {
      id: uuidv4(),
      title: 'New tab',
      query: query,
      active: true,
    },
  ]);

  console.log('⭐: ', query);

  const addTab = () => {
    if (tabs) {
      const tab: ITab = { id: uuidv4(), title: 'New tab', query: '', active: false };
      setTabs((prevState) => {
        return prevState.concat(tab);
      });
      setTabs((prevState) => {
        return prevState.map((t) =>
          t.id === tab.id ? { ...t, active: true } : { ...t, active: false }
        );
      });
    }
  };

  const setActiveButton = (id: string) => {
    setTabs((prevState) => {
      return prevState.map((t) => (t.id === id ? { ...t, active: true } : { ...t, active: false }));
    });
  };

  const deleteTab = (id: string) => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].id === id) {
        tabs[i - 1].active = true;
        return tabs;
      }
    }

    setTabs((prevState) => {
      return prevState.filter((el) => el.id !== id);
    });

    console.log('⭐:124 ', tabs);

    // setTabs((prevState) => {
    //   return prevState.map((t) => (t[0] ? { ...t, active: true } : { ...t, active: false }));
    // });
  };

  useEffect(() => {}, [tabs]);

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" width="100%" position="relative">
        <Stack direction="row" justifyContent="start" width="50%" gap={1} position="relative">
          {tabs.map((t) => (
            <TabButton
              key={t.id}
              onClick={() => setActiveButton(t.id)}
              style={{
                backgroundColor: t.active ? indigo[700] : blueGrey[100],
                color: t.active ? blue[100] : blue[700],
              }}
            >
              <EditableText initText={t.title} active={t.active} />
              <InnerButton onClick={() => deleteTab(t.id)}>
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
