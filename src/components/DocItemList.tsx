import { Divider, List, ListItem } from '@mui/material';
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
  if (type.description) {
    return <h2>{type.description}</h2>;
  } else if (type.fields) {
    return (
      <List>
        {type.fields.map((item, ind) => (
          <>
            <ListItem key={ind}>
              <DocItem field={item} schema={schema} stateSetter={stateSetter} />
            </ListItem>
            {ind !== type.fields!.length - 1 && <Divider variant="middle" />}
          </>
        ))}
      </List>
    );
  } else if (type.inputFields) {
    return (
      <List>
        {type.inputFields.map((item, ind) => (
          <ListItem key={ind}>
            <DocItem field={item} schema={schema} stateSetter={stateSetter} />
            {ind !== type.inputFields?.length && <Divider />}
          </ListItem>
        ))}
      </List>
    );
  } else {
    return <h2>Error</h2>;
  }
};
