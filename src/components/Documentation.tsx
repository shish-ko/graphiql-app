import { ArrowLeft } from '@mui/icons-material';
import { Button, Drawer, styled, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { defer } from 'react-router-dom';
import { Schema } from '~interfaces/doc_interfaces';
import { schemaFetcher } from '~utils/docParser';
import { useDocumentation } from '~utils/userHooks';
import { DocItemList } from './DocItemList';
import { SideButton } from './UI_components';

export const loader = () => {
  const data = schemaFetcher();
  return defer({ data });
};

const DocBar = styled(Drawer)({
  '& 	.MuiDrawer-paperAnchorRight': {
    maxWidth: '500px',
    paddingTop: '86px',
  },
});

const DocHeader = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(10),
  color: '#3B4C68',
}));

interface IDocProps {
  schema: Schema;
}

export const Documentation: React.FC<IDocProps> = ({ schema }: IDocProps) => {
  const [isDocOpen, setIsDocOpen] = useState(false);
  const { typeSetter, typeToDisplay, getBack, isBackPossible } = useDocumentation(schema);

  useEffect(() => {
    typeSetter('Query');
  }, []);

  return (
    <>
      <DocBar
        anchor="right"
        open={isDocOpen}
        onClose={() => setIsDocOpen(false)}
        BackdropProps={{ invisible: true }}
      >
        <DocHeader>
          <Button sx={{ color: '#444' }} onClick={getBack} disabled={!isBackPossible}>
            <ArrowLeft />
            Back
          </Button>
          <Typography variant="h5">Api Doc</Typography>
        </DocHeader>
        {typeToDisplay && <DocItemList type={typeToDisplay} stateSetter={typeSetter} />}
      </DocBar>
      <SideButton variant="contained" onClick={() => setIsDocOpen(true)}>
        Open doc
      </SideButton>
    </>
  );
};
