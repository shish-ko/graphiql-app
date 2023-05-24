import { ArrowLeft, Close } from '@mui/icons-material';
import { Button, Drawer, styled, Toolbar, Typography } from '@mui/material';
import { buildClientSchema, GraphQLSchema, IntrospectionQuery } from 'graphql';
import React, { useEffect, useState } from 'react';
import { defer } from 'react-router-dom';
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
  gap: theme.spacing(2),
  color: '#3B4C68',
}));

interface IDocProps {
  schema: IntrospectionQuery;
  schemaSetter: React.Dispatch<React.SetStateAction<GraphQLSchema | undefined>>;
}

export const Documentation: React.FC<IDocProps> = ({ schema, schemaSetter }: IDocProps) => {
  const [isDocOpen, setIsDocOpen] = useState(false);
  const { typeSetter, typeToDisplay, getBack, isBackPossible } = useDocumentation(schema);
  useEffect(() => {
    schemaSetter(buildClientSchema(schema as unknown as IntrospectionQuery));
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
          <Button
            sx={{ color: '#444', display: { sm: 'none' } }}
            onClick={() => setIsDocOpen(false)}
          >
            close
            <Close />
          </Button>
        </DocHeader>
        {typeToDisplay && <DocItemList type={typeToDisplay} stateSetter={typeSetter} />}
      </DocBar>
      <SideButton
        variant="contained"
        onClick={() => setIsDocOpen(true)}
        sx={{
          zIndex: 100,
        }}
      >
        Open doc
      </SideButton>
    </>
  );
};
