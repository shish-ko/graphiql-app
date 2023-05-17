import { Divider, List, ListItem, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { Schema, TypesEntity } from '~interfaces/doc_interfaces';
import { DocItem } from './DocItem';

interface IDocItemListProps {
  type: TypesEntity;
  schema: Schema;
  stateSetter: Dispatch<SetStateAction<TypesEntity | undefined>>;
}

export const DocItemList: React.FC<IDocItemListProps> = ({
  type,
  stateSetter,
  schema,
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
          <>
            <ListItem key={ind}>
              <DocItem field={item} schema={schema} stateSetter={stateSetter} />
            </ListItem>
            {ind !== arr.length - 1 && <Divider variant="middle" key={ind.toString()} />}
          </>
        ))}
      </>
    );
  } else if (type.inputFields) {
    return (
      <>
        {type.inputFields.map((item, ind, arr) => (
          <>
            <ListItem key={ind}>
              <DocItem field={item} schema={schema} stateSetter={stateSetter} />
            </ListItem>
            {ind !== arr.length - 1 && <Divider variant="middle" key={ind.toString()} />}
          </>
        ))}
      </>
    );
  } else {
    return <h2>Error</h2>;
  }
  return <List>{render}</List>;
};
