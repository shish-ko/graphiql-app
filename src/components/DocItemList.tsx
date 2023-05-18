import { Divider, List, ListItem, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { TypesEntity } from '~interfaces/doc_interfaces';
import { DocItem } from './DocItem';

interface IDocItemListProps {
  type: TypesEntity;
  stateSetter: (typeName: string) => void;
}

export const DocItemList: React.FC<IDocItemListProps> = ({
  type,
  stateSetter,
}: IDocItemListProps) => {
  let render;

  if (type.description) {
    render = (
      <ListItem>
        <Typography>{type.description}</Typography>
      </ListItem>
    );
  } else if (type.fields) {
    render = (
      <>
        {type.fields.map((item, ind, arr) => (
          <Fragment key={item.name}>
            <ListItem>
              <DocItem field={item} stateSetter={stateSetter} />
            </ListItem>
            {ind !== arr.length - 1 && <Divider variant="middle" key={ind} />}
          </Fragment>
        ))}
      </>
    );
  } else if (type.inputFields) {
    return (
      <>
        {type.inputFields.map((item, ind, arr) => (
          <Fragment key={item.name}>
            <ListItem>
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
