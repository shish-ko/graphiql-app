import React from 'react';
import { FieldsEntity } from '../interfaces/doc_interfaces';

interface IDocItemProps {
  type: FieldsEntity;
}
export const DocItem: React.FC<IDocItemProps> = ({ type }: IDocItemProps) => {
  return <h1>{type.name}</h1>;
};
