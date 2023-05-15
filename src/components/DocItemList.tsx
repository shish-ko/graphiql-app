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
  } else {
    return (
      <>
        {type.fields ? (
          type.fields.map((item, ind) => (
            <DocItem field={item} key={ind} schema={schema} stateSetter={stateSetter} />
          ))
        ) : (
          <h2>Error!</h2>
        )}
      </>
    );
  }
};
