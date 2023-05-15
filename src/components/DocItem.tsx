import React, { Dispatch, SetStateAction } from 'react';
import { FieldsEntity, Schema, Type, TypesEntity } from '~interfaces/doc_interfaces';

interface IDocItemProps {
  type: FieldsEntity;
  schema: Schema;
  stateSetter: Dispatch<SetStateAction<TypesEntity | undefined>>;
}
export const DocItem: React.FC<IDocItemProps> = ({ type, schema, stateSetter }: IDocItemProps) => {
  const typeToDisplay = getTypeName(type.type);
  const setType = () => {
    const typeToSet = schema.types.find((item) => item.name === typeToDisplay);
    stateSetter(typeToSet);
  };
  return <h1 onClick={setType}>{typeToDisplay}</h1>;
};

function getTypeName(type: Type): string {
  return type.ofType ? getTypeName(type.ofType) : type.name!;
}
