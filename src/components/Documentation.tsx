import { ArrowLeft, Close } from '@mui/icons-material';
import { Button, Drawer, styled, Toolbar, Typography } from '@mui/material';
import { buildClientSchema, GraphQLSchema, IntrospectionQuery } from 'graphql';
import React, { useEffect, useState } from 'react';
import { useDocumentation } from '~utils/userHooks';
import { DocItemList } from './DocItemList';
import { SideButton } from './UI_components';
import useTranslation from '~utils/localization';
import { useLoaderData } from 'react-router-dom';

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
  schemaSetter: React.Dispatch<React.SetStateAction<GraphQLSchema | undefined>>;
}

export const Documentation: React.FC<IDocProps> = ({ schemaSetter }: IDocProps) => {
  const localization = useTranslation();
  const [isDocOpen, setIsDocOpen] = useState(false);
  const schema = useLoaderData() as IntrospectionQuery;
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
            {localization.docs.back}
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
        {localization.docs.open}
      </SideButton>
    </>
  );
};

export default Documentation;
