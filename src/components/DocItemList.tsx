import { Divider, List, ListItem, Typography } from '@mui/material';
import { IntrospectionType } from 'graphql';
import React, { Fragment } from 'react';
import { DocItem } from './DocItem';

interface IDocItemListProps {
  type: IntrospectionType;
  stateSetter: (typeName: string) => void;
}

export const DocItemList: React.FC<IDocItemListProps> = ({
  type,
  stateSetter,
}: IDocItemListProps) => {
  let render;
  if (type.kind === 'SCALAR' || type.kind === 'ENUM') {
    render = (
      <ListItem>
        <Typography>{type.description}</Typography>
      </ListItem>
    );
  } else if (type.kind === 'OBJECT') {
    render = (
      <>
        {type.fields.map((item, ind, arr) => (
          <Fragment key={item.name}>
            <ListItem sx={{ flexWrap: 'wrap' }}>
              <DocItem field={item} stateSetter={stateSetter} />
            </ListItem>
            {ind !== arr.length - 1 && <Divider variant="middle" key={ind} />}
          </Fragment>
        ))}
      </>
    );
  } else if (type.kind === 'INPUT_OBJECT') {
    render = (
      <>
        {type.inputFields.map((item, ind, arr) => (
          <Fragment key={item.name}>
            <ListItem sx={{ flexWrap: 'wrap' }}>
              <DocItem field={item} stateSetter={stateSetter} />
            </ListItem>
            {ind !== arr.length - 1 && <Divider variant="middle" key={ind} />}
          </Fragment>
        ))}
      </>
    );
  } else {
    return <h2>Error</h2>;
  }
  return <List>{render}</List>;
};
